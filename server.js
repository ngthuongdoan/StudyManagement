const express = require("express");
const pageRouter = require(`./controllers/pageRouter`);
const app = express();

app.use(express.static(`${__dirname}/views`));
app.use(express.urlencoded());

app.use("/", pageRouter);

app.use((req, res, next) => {
  let err = new Error("Page not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});
const port = 8000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
