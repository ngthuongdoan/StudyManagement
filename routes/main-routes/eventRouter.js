const fs = require("fs");
const express = require("express");
const conn = require("../../models/connection");
const session = require("../../controllers/session");
const popup = require("../../controllers/replaceTemplate");
const eventPage = fs.readFileSync(`${__dirname}/../../views/event.html`);
const Event = require("../../controllers/classes/Event");
let resultPage;
const router = express.Router();

const createEventCards = (results) => {
  for (let j = 0; j < results.length; j++) {
    let card = fs.readFileSync(
      `${__dirname}/../../views/placeholder/event-card.html`
    );
    const event = new Event({
      title: results[j].eventName,
      start: results[j].eventStartTime,
      end: results[j].eventEndTime,
      department: results[j].eventPlace,
      note: results[j].eventNote,
      backgroundColor: results[j].eventColor,
    });
    card = popup.replaceTemplate(
      "{% DATA %}",
      JSON.stringify(event.send()),
      card
    );
    card = popup.replaceTemplate(/{% NAME %}/g, event.title, card);
    card = popup.replaceTemplate("{% PLACE %}", event.department, card);
    card = popup.replaceTemplate("COLOR", "#" + event.backgroundColor, card);
    let start = new Date(event.start);
    let end = new Date(event.end);
    card = popup.replaceTemplate(
      "{% START %}",
      `${start.toDateString()} ${start.getHours()}:${start.getMinutes()}`,
      card
    );
    card = popup.replaceTemplate(
      "{% END %}",
      `${end.toDateString()} ${end.getHours()}:${end.getMinutes()}`,
      card
    );

    fs.appendFileSync(
      `${__dirname}/../../views/placeholder/event-data.html`,
      card
    );
  }
};

const replaceResultPage = (session) => {
  const eventdata = fs.readFileSync(
    `${__dirname}/../../views/placeholder/event-data.html`
  );

  resultPage = popup.replaceAccountTemplate(session, eventPage);
  resultPage = popup.replaceTemplate("{% CARDS %}", eventdata, resultPage);
  fs.writeFileSync(`${__dirname}/../../views/placeholder/event-data.html`, "");
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
  .post((req, res) => {
    const eventStartTime =
      req.body.eventStartDate + "T" + req.body.eventStartTime;
    const eventEndTime = req.body.eventEndDate + "T" + req.body.eventEndTime;

    const postEvent = new Event({
      title: req.body.eventName,
      start: eventStartTime,
      end: eventEndTime,
      department: req.body.eventPlace,
      note: req.body.eventNote,
      backgroundColor: req.body.eventColor,
    });
    conn.query(
      `INSERT INTO events VALUE('${req.session.username}',?,?,?,?,?,?,?)`,
      postEvent.post(),
      (error, results, fields) => {
        if (error) {
          console.log(error.message);
          res.redirect("/notfound");
        } else {
          res.redirect("/event");
        }
      }
    );
  })
  .delete((req, res) => {
    const event = new Event({
      title: req.body.eventName,
    });
    conn.query(
      "DELETE FROM events WHERE username=? AND eventName=?",
      [req.session.username, event.title],
      (error, results, fields) => {
        if (error) {
          console.log(error.message);
          res.redirect("/notfound");
        } else {
          res.redirect("/event");
        }
      }
    );
  });

module.exports = router;
