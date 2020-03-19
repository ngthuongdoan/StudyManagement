require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 8000; // eslint-disable-line
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});