const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  database: "testing",
  user: "root",
  password: "rootpassword"
});

conn.connect(err => {
  if (err) return console.log(err.message);
  return console.log("Success");
});

module.exports = conn;
