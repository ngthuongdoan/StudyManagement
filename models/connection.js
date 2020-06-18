const mysql = require("mysql");
const util = require("util");

const conn = mysql.createConnection({
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

conn.connect((err) => {
  console.log(err);
  err ? console.log("Turn on MySQL service") : console.log("Connected");
});
const query = util.promisify(conn.query).bind(conn);

module.exports = { conn, query };
