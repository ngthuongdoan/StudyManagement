const fs = require("fs");
const express = require("express");
const { query } = require("../../models/connection");
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
    let start = new Date(results[j].eventStartTime);
    start.setHours(start.getHours() + 7);
    let end = results[j].eventEndTime;
    end.setHours(end.getHours() + 7);
    const event = new Event({
      title: results[j].eventName,
      start: start,
      end: end,
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
    card = popup.replaceTemplate(
      "{% START %}",
      `${start.toISOString().split("T")[0]} at ${start
        .toISOString()
        .split("T")[1]
        .slice(0, 5)}`,
      card
    );
    card = popup.replaceTemplate(
      "{% END %}",
      `${end.toISOString().split("T")[0]} at ${end
        .toISOString()
        .split("T")[1]
        .slice(0, 5)}`,
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
  .get(async (req, res) => {
    if (session.sessionCheck(req, res)) {
      if (req.session.loggedin) {
        const queryevents = await query(
          "SELECT * FROM events WHERE username=?",
          [req.session.username]
        );
        createEventCards(queryevents);
        replaceResultPage(req.session);
        res.end(resultPage);
      } else {
        res.redirect("/login");
      }
    } else {
      //PREVENT TO LOGIN /dashboard BY URL
      res.redirect("/login");
    }
  })
  .post(async (req, res) => {
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
    try {
      await query(
        `INSERT INTO events VALUE('${req.session.username}',?,?,?,?,?,?,?)`,
        postEvent.post()
      );
      res.redirect("/event");
    } catch (error) {
      console.log(error.message);
      res.redirect("/notfound");
    }
  })
  .put(async (req, res) => {
    if (req.body.timetable) {
      const modifyEvent = new Event({
        title: req.body.title,
        start: new Date(req.body.start),
        end: new Date(req.body.end),
        department: req.body.department,
        note: req.body.note,
        backgroundColor: req.body.backgroundColor,
      });
      try {
        await query(
          "UPDATE events SET eventStartTime = ?, eventEndTime = ?, eventPlace = ?,eventNote = ?, eventColor = ? WHERE eventName = ? AND username = ?",
          [
            new Date(modifyEvent.start),
            new Date(modifyEvent.end),
            modifyEvent.department,
            modifyEvent.note,
            modifyEvent.backgroundColor.replace("#", ""),
            modifyEvent.title,
            req.session.username,
          ]
        );
        res.status(200).send();
      } catch (e) {
        res.status(404).send();
      }
    } else {
      const eventStartTime =
        req.body.eventStartDate + "T" + req.body.eventStartTime;
      const eventEndTime = req.body.eventEndDate + "T" + req.body.eventEndTime;

      const modifyEvent = new Event({
        title: req.body.eventName,
        start: eventStartTime,
        end: eventEndTime,
        department: req.body.eventPlace,
        note: req.body.eventNote,
        backgroundColor: req.body.eventColor,
      });
      try {
        await query(
          "UPDATE events SET eventStartTime = ?, eventEndTime = ?, eventPlace = ?,eventNote = ?, eventColor = ? WHERE eventName = ? AND username = ?",
          [
            new Date(modifyEvent.start),
            new Date(modifyEvent.end),
            modifyEvent.department,
            modifyEvent.note,
            modifyEvent.backgroundColor,
            modifyEvent.title,
            req.session.username,
          ]
        );
        res.redirect("/event");
      } catch (e) {
        res.redirect("/notfound");
      }
    }
  })
  .delete(async (req, res) => {
    const event = new Event({
      title: req.body.eventName,
    });
    try {
      await query("DELETE FROM events WHERE username=? AND eventName=?", [
        req.session.username,
        event.title,
      ]);
      res.redirect("/event");
    } catch (e) {
      console.log(e.message);
      res.redirect("/notfound");
    }
  });

module.exports = router;
