const fs = require("fs");
const express = require("express");
const conn = require("../models/connection");
const session = require("../controllers/session");
const popup = require("../controllers/replaceTemplate");
const eventPage = fs.readFileSync(`${__dirname}/../views/event.html`);
let resultPage;
const router = express.Router();

const createEventCards = (results) => {
  for (let j = 0; j < results.length; j++) {
    let card = fs.readFileSync(
      `${__dirname}/../views/placeholder/event-card.html`
    );
    card = popup.replaceTemplate(/{% NAME %}/g, results[j].eventName, card);
    card = popup.replaceTemplate("{% PLACE %}", results[j].eventPlace, card);
    card = popup.replaceTemplate("COLOR", results[j].eventColor, card);
    let start = new Date(results[j].eventStartTime);
    let end = new Date(results[j].eventEndTime);
    card = popup.replaceTemplate(
      "{% START %}",
      start.getDate(),
      card
    );
    card = popup.replaceTemplate("{% END %}", end.getDay(), card);

    fs.appendFileSync(
      `${__dirname}/../views/placeholder/event-data.html`,
      card
    );
  }
};

const replaceResultPage = (session) => {
  const eventdata = fs.readFileSync(
    `${__dirname}/../views/placeholder/event-data.html`
  );

  resultPage = popup.replaceAccountTemplate(session, eventPage);
  resultPage = popup.replaceTemplate("{% CARDS %}", eventdata, resultPage);
  fs.writeFileSync(`${__dirname}/../views/placeholder/event-data.html`, "");
};

router
  .route("/")
  .get((req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        conn.query(
          "SELECT * FROM events WHERE username=?",
          [req.session.username],
          (error, results, field) => {
            createEventCards(results);
            replaceResultPage(req.session);
            res.end(resultPage);
          }
        );
      } else {
        res.redirect("/login");
      }
    } else {
      //PREVENT TO LOGIN /dashboard BY URL
      res.redirect("/login");
    }
  })
  .post((req, res) => {});

module.exports = router;
