const express = require("express");
const session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const conn = require("./models/connection");
const cookieparser = require("cookie-parser");
const pageRouter = require(`./controllers/pageRouter`);
const morgan = require("morgan");
const app = express();

const options = {
  host: process.env.MYSQL_URL,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  clearExpired: true,
  // How frequently expired sessions will be cleared; milliseconds:
  checkExpirationInterval: 900000,
  // The maximum age of a valid session; milliseconds:
  expiration: 1000*60*30,
  // Whether or not to create the sessions database table, if one does not already exist:
  createDatabaseTable: true,
  // Number of connections when creating a connection pool:
  connectionLimit: 1,
  // Whether or not to end the database connection when the store is closed.
  // The default value of this option depends on whether or not a connection was passed to the constructor.
  // If a connection object is passed to the constructor, the default value for this option is false.
  endConnectionOnClose: true,
  charset: "utf8mb4_bin",
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data"
    }
  }
};

const sessionStore = new MySQLStore(options, conn);
app.use(morgan("dev"));

// app.use('truth proxy', true);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "FMS",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {
      maxAge: 900000,
      secure: false
    }
  })
);

app.use(cookieparser());
app.use(express.static(`${__dirname}/views`));
app.use(express.static(`${__dirname}/models/avatars`));

app.use("/", pageRouter);

app.use((req, res, next) => {
  let err = new Error("Page not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.redirect("/notfound");
});

module.exports = app;
