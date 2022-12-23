var express = require("express");
var app = express();
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "arunee_admin",
  password: "mysql@min",
  database: "arunee_website",
});

app.get("/test", function (req, res) {
  con.connect(function (err) {
    if (err) {
      req.send(err);
    } else {
      con.query("SELECT * FROM `test`", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
      });
    }
  });
});


app.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
