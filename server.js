const express = require("express");
const path = require("path");
// const db = require("./database");
const axios = require("axios");
const mysql = require("mysql");
var homeRouter = require("./routes/home");
const { diffieHellman } = require("crypto");
const { store_data } = require("./GetData");
const { type } = require("os");

const app = express();
app.set("views", path.join(__dirname, "views"));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static("public"));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost", // in case of server, put ip address of that server
  user: "root",
  password: "", // for XAMPP password is '', and for mampp password is 'root'
  database: "QuadB",
});

db.connect((err) => {
  // function it take err as argu, if error throw error.
  if (err) {
    console.log(err);
  } else {
    console.log("Database is connected...");
  }
});

const name = ['WazirX', 'Bitbns', 'Colodax', 'Zebpay','CoinDCX','Colnux','Delbog','RacteX', 'Smifft','ExeRY']
app.get("/", (req, res)=>{
    db.query(`SELECT * FROM DATA`, (err, result, fields)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('Home' ,{data: result, name:name});
        }
    })
});

const PORT = 8007;
app.listen(PORT, () => {
  console.log(`Server is on PORT ${PORT}`);
});
