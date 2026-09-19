import mysql from "mysql2";

const isProduction = !!process.env.DB_HOST;

let connection;

if (isProduction) {
    // Render -> Aiven
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),

        ssl: process.env.DB_CA
            ? {
                ca: Buffer.from(
                    process.env.DB_CA,
                    "base64"
                ).toString("utf8")
            }
            : {}
    });
} else {
    // Local MySQL
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Tamilikamdongo45",
        database: "revnue"
    });
}

connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }

    console.log(
        isProduction
            ? "Connected to Aiven MySQL"
            : "Connected to local MySQL"
    );
});

export default connection;