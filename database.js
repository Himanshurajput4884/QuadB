const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "QuadB",
})

db.connect((err)=>{
    if(err){
        console.log("Error: ", err);
    }
    else{
        console.log("Database Connected...");
    }
});

module.exports = db;