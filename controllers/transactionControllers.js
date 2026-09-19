import db from '../config/databaseConnection.js'
import multer from 'multer'
const upload = multer({dest:'uploads/'});
import csv from 'csv-parser'
import fs from "fs";

  const formatDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};


const parserCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};
const COLUMN_ALIASES = {
  transaction_date: [
    "transaction date",
    "date",
    "trans date",
    "posting date",
    "value date"
  ],

  transaction_source: [
    "transaction source",
    "source",
    "description",
    "transaction description",
    "details",
    "reference",
    "memo",
    "narrative"
  ],

  amount: [
    "amount",
    "transaction amount",
    "value"
  ],

  debit: [
    "debit",
    "money out",
    "withdrawal"
  ],

  credit: [
    "credit",
    "money in",
    "deposit"
  ],

  // KEEPING YOUR EXISTING SPELLING
  transcation_type: [
    "transcation type",
    "transaction type",
    "type"
  ]
};


const normalizeHeader = (header) => {
  return header
    .trim()
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ");
};


const detectColumns = (row) => {
  const detected = {};

  for (const originalHeader of Object.keys(row)) {

    const normalizedHeader = normalizeHeader(originalHeader);

    for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {

      if (aliases.includes(normalizedHeader)) {
        detected[field] = originalHeader;
        break;
      }

    }
  }

  return detected;
};


const parseAmount = (value) => {

  if (value === undefined || value === null || value === "") {
    return 0;
  }

  const cleaned = String(value)
    .replace(/R/g, "")
    .replace(/,/g, "")
    .trim();

  const amount = Number(cleaned);

  return Number.isNaN(amount) ? 0 : amount;
};


const getAmount = (row, columns) => {

  // CSV has a normal amount column
  if (columns.amount) {
    return parseAmount(row[columns.amount]);
  }

  // CSV separates debit and credit
  const debit = columns.debit
    ? parseAmount(row[columns.debit])
    : 0;

  const credit = columns.credit
    ? parseAmount(row[columns.credit])
    : 0;

  return credit - debit;
};


const normalizeTransaction = (row, columns) => {

  const amount = getAmount(row, columns);

  return {
    transaction_date:
      row[columns.transaction_date],

    transaction_source:
      row[columns.transaction_source],

    amount,

    // KEEPING transcation_type
    transcation_type:
      columns.transcation_type
        ? row[columns.transcation_type]
        : amount >= 0
          ? "income"
          : "expense"
  };
};

export const createTransaction = (req, res) =>{
        console.log("BODY:", req.body);
console.log(req.headers);
console.log(req.body);
    const {user_id, transcation_type, amount, transaction_source, transaction_date} = req.body
    if(! user_id || !transcation_type || !amount || !transaction_source || !transaction_date){
        return res.status(401).json({message:'missing or invalid fields'})
    }
    const sql = 'INSERT INTO transaction (user_id, transcation_type, amount, transaction_source, transaction_date) VALUES(?,?,?,?,?)'
    db.query(sql, [user_id, transcation_type, amount, transaction_source, transaction_date], (err, result ) =>{
        if(err){
            console.log(err);
            return res.status(500).json({message:'DB Error', err})
        }
        return res.status(201).json({
            message:'successfully connected',
            transaction_id : result.insertId
        })
    })

};

export const getTransaction = (req, res) => {
    const userId = req.params.user_id;
    const sql = "SELECT * FROM transaction WHERE user_id = ?";

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: "error occurred while getting data",
                error: err
            });
        }

        res.json(results);
    });
};



export const uploadFile = async (req, res) => {

  console.log("🔥 uploadFile ENTERED");
  console.log("FILE:", req.file);

  let filePath;

  try {

    const userId = req.body.user_id;

    // Check file BEFORE trying req.file.path
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    filePath = req.file.path;

    const transactions = await parserCSV(filePath);

    console.log("PARSED ROWS:", transactions);

    if (!transactions || transactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "CSV is empty or invalid"
      });
    }

    // --------------------------------
    // DETECT CSV COLUMNS
    // --------------------------------

    const columns = detectColumns(transactions[0]);

    console.log("DETECTED COLUMNS:", columns);

    // --------------------------------
    // VALIDATE REQUIRED COLUMNS
    // --------------------------------

    if (!columns.transaction_date) {
      return res.status(400).json({
        success: false,
        message: "Could not identify transaction date column"
      });
    }

    if (!columns.transaction_source) {
      return res.status(400).json({
        success: false,
        message: "Could not identify transaction description/source column"
      });
    }

    if (
      !columns.amount &&
      !columns.debit &&
      !columns.credit
    ) {
      return res.status(400).json({
        success: false,
        message: "Could not identify transaction amount column"
      });
    }

    // --------------------------------
    // NORMALIZE TRANSACTIONS
    // --------------------------------

    const normalizedTransactions =
      transactions.map((row) =>
        normalizeTransaction(row, columns)
      );

    console.log(
      "NORMALIZED TRANSACTIONS:",
      normalizedTransactions
    );

    // --------------------------------
    // EXISTING DATABASE INSERT
    // --------------------------------

    let insertedCount = 0;

    const sql = `
      INSERT INTO transaction
      (
        user_id,
        transcation_type,
        amount,
        transaction_source,
        transaction_date
      )
      VALUES(?,?,?,?,?)
    `;

    for (const t of normalizedTransactions) {

      await new Promise((resolve, reject) => {

        db.query(
          sql,
          [
            userId,
            t.transcation_type,
            t.amount,
            t.transaction_source,
            formatDate(t.transaction_date)
          ],
          (err) => {

            if (err) {
              console.error(
                "DB INSERT ERROR:",
                err
              );

              return reject(err);
            }

            insertedCount++;

            resolve();
          }
        );
      });
    }

    return res.json({
      success: true,
      count: insertedCount
    });

  } catch (e) {

    console.error("UPLOAD ERROR:", e);

    return res.status(500).json({
      success: false,
      error: e.message
    });

  } finally {

    // Remove temporary CSV after processing
    if (filePath) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(
            "TEMP FILE DELETE ERROR:",
            err
          );
        }
      });
    }
  }
};

export const income = (req, res) =>{
    const sql = 'SELECT SUM (amount) AS total_income FROM transaction WHERE transcation_type = income';
    
    db.query(sql, (err, rows) =>{
        if (err){
            console.log (err);
            return res.status(500).json({
                message: 'An error occured'
            })
        }
        return res.status(200).json({
            total_income: rows[0].total_income  || 0
        })
    })
}