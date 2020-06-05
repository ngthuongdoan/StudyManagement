const mysql = require("mysql");

const databaseName =
  process.env.ENVIRONMENT == "dev"
    ? process.env.MYSQL_DATABASE
    : process.env.MYSQL_REAL_DATABASE;

const conn = mysql.createConnection({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: databaseName,
});

conn.connect((err) => {
  err ? console.log("Turn on MySQL service") : console.log("Connected");
  console.log(databaseName);
});

module.exports = conn;
