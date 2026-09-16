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



export const uploadFile = async (req, res) =>{

  const userId = req.body.user_id;

    console.log("🔥 uploadFile ENTERED");
    console.log("FILE:", req.file);
    try{
const filePath = req.file.path;


if (!filePath){
    return res.status(400).json({
        success:false,
        message:'No file uploaded'
    });
}

const transactions = await parserCSV (filePath)
console.log("PARSED ROWS:", transactions);

if (!transactions || transactions.length === 0){
      return res.status(400).json({
        success: false,
        message: "CSV is empty or invalid",
      });
}

let insertedCount = 0;
const sql = 'INSERT INTO transaction (user_id, transcation_type, amount, transaction_source, transaction_date) VALUES(?,?,?,?,?)'
for(const t of transactions){
    console.log("ROW:", t);
await new Promise ((resolve, reject) =>{
    db.query(
        sql,
        [
             userId,
            t.transcation_type,
            t.amount,
             t.transaction_source,
            formatDate(t.transaction_date)
           
            
        ],
        (err) =>{
            if (err) {
  console.error("DB INSERT ERROR:", err);
  return reject(err);
}
            if (err) return reject(err);
            insertedCount++;
            resolve()
        }

        
    )
})
}

res.json({
    success:true,
    count:transactions.length
})
    }
    catch (e){
        res.status(500).json({success:false, error: e.message})
    }
}


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