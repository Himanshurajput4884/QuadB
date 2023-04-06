const mysql = require("mysql");
const axios = require("axios");
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


const store_data = async() => {
    const reqdata = [];
  await axios
    .get("https://api.wazirx.com/api/v2/tickers")
    .then((response) => {
      const data = Object.keys(response.data).slice(0, 10);
    //   console.log(data);
      data.map((key) => {
        reqdata.push(response.data[key]);
      });
    })
    .catch((error) => {
        console.error(error);
    });
    // console.log(reqdata);
  let q = `DELETE FROM DATA`;
  db.query(q, (err, result, fields) => {
    if (err) {
      console.log("Error in delete: ", err);
    } else {
      let average = 0;
      reqdata.map((value) => {
        average += parseInt(value.last);
      });
      average = average / 10;
      reqdata.map((value) => {
        let profit;
        let difference, saving;
        saving = average - parseInt(value.sell);
        saving >= 0 ? (profit = 1) : (profit = 0);
        difference = (saving / average) * 100;
        db.query(
          "INSERT INTO DATA SET ?",
          {
            base_unit: value.base_unit,
            last: value.last,
            buy: value.buy,
            sell: value.sell,
            difference: difference,
            saving: saving,
            profit: profit,
            average: average,
          },
          (err, results) => {
            if (err) {
              console.log("Error in inserting: ", error);
            }
          }
        );
      });
    }
  });
};
store_data();

module.exports = store_data;