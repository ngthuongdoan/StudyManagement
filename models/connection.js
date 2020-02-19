const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  database: "testing",
  user: "root",
  password: "rootpassword"
});

const connect = conn.connect(err => {
  if (err) return console.log(err.message);
  return console.log("Success to connect");
});

module.exports = conn;
