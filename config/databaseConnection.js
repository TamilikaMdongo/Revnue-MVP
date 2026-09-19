import mysql from "mysql2"

let connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "Tamilikamdongo45",
    database: "revnue"
});

 connection.connect(function(err){
   
    console.log ('connected')
})

export default connection
