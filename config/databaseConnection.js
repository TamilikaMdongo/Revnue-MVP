import mysql from "mysql2";

const isProduction = !!process.env.DB_HOST;

const dbConfig = isProduction
    ? {
        // Render -> Aiven
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
    }
    : {
        // Local MySQL
        host: "localhost",
        user: "root",
        password: process.env.LOCAL_DB_PASSWORD,
        database: "revnue"
    };

const connection = mysql.createPool({
    ...dbConfig,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

connection.getConnection((err, conn) => {
    if (err) {
        console.error("Database connection failed:", err.message);
        return;
    }

    console.log(
        isProduction
            ? "Connected to Aiven MySQL pool"
            : "Connected to local MySQL pool"
    );

    conn.release();
});

export default connection;