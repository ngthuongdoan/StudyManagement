const mysql = require("mysql");

const conn = mysql.createConnection({
  host     : process.env.MYSQL_URL,
  user     : process.env.MYSQL_USERNAME,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

const connect = conn.connect(err => {
  if (err) return console.log(err.message);
  return console.log("Success to connect");
});

module.exports = conn;
