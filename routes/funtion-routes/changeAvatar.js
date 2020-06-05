const express = require("express");
const mv = require("mv");
const conn = require("../../models/connection");
const formidable = require("formidable");
const path = require("path");
const router = express.Router();

router.route("/").post((req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let oldpath = files["file-0"].path;
    let extension = files["file-0"].name.split(".");
    let newpath = path.join(
      __dirname,
      "../../models/avatars/",
      req.session.username + "." + extension[extension.length - 1]
    );
    mv(oldpath, newpath, function (err) {
      if (err) throw err;
      conn.query(
        "UPDATE accounts SET avatar=? WHERE username=?",
        [
          req.session.username + "." + extension[extension.length - 1],
          req.session.username,
        ],
        (error, results, fields) => {
          if (err) throw err;
          res.status(200).send();
        }
      );
    });
  });
});

module.exports = router;
