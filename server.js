const express = require("express");
const pageRouter= require(`./controllers/pageRouter`);
const app = express();

app.use(express.static(`${__dirname}/views`));

app.use('/',pageRouter);
const port = 8000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
