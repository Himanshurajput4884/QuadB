const express = require("express");
const path = require("path");
// const db = require("./database");
const axios = require("axios");
const mysql = require("mysql");
var homeRouter = require("./routes/home");
const { diffieHellman } = require("crypto");

const app = express();
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static('public'));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",                           // in case of server, put ip address of that server
    user: "root",
    password: "",           // for XAMPP password is '', and for mampp password is 'root'
    database: "QuadB"
}); 

db.connect( (err)=>{                    // function it take err as argu, if error throw error.
    if(err){
        console.log(err);
    }
    else{
        console.log("Database is connected...");
    }
} );

const store_data = async (reqdata)=>{
    let q = `DELETE FROM DATA`;
    db.query(q, (err, result, fields)=>{
        if(err){
            console.log("Error in delete: ", err);
        }
        else{
            let average = 0;
            reqdata.map((value)=>{
                average += parseInt(value.last);
            })
            average = average/10;
            req.data.map((value)=>{
                let profit;
                let difference, saving;
                saving = average-parseInt(value.sell);
                (saving >= 0) ? profit=1 : profit=0;
                difference = (saving / average)*100;
                const [base_unit, last, buy, sell, difference, saving, profit] = {value.base_unit, parseInt(value.last), parseInt(value.buy), parseInt(value.sell), difference, saving, profit};
            })
        }
    })
}


app.get("/", (req, res)=>{
    axios.get('https://api.wazirx.com/api/v2/tickers')
    .then(response => {
    const data = Object.keys(response.data).slice(0, 10);
    console.log(typeof(response));
    console.log(data);
    const reqdata = [];
    data.map((key)=>{
        reqdata.push(response.data[key]);
    })
    console.log(reqdata);
    // res.render('home.ejs', {status:201 , data: reqdata});
    

    })
    .catch(error => {
        console.error(error);
        res.render('home.ejs', {status:401});
    });
})



const PORT = 8007; 
app.listen(PORT, ()=>{
    console.log(`Server is on PORT ${PORT}`);
})

