/* eslint-disable no-undef */
function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
}

function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i + 1);
  }
  return indexes;
}
document.addEventListener("DOMContentLoaded", function () {
  let Calendar = FullCalendar.Calendar;
  let Draggable = FullCalendarInteraction.Draggable;
  /* initialize the external events
                                  -----------------------------------------------------------------*/

  let containerEventsEl = document.getElementById("external-events-list");
  new Draggable(containerEventsEl, {
    itemSelector: ".fc-event",
    eventData: function (eventEl) {
      let data = eventEl.dataset.event;
      data = JSON.parse(data);
      return {
        title: data.title,
        backgroundColor: data.backgroundColor,
        extendedProps: {
          department: data.extendedProps.department,
        },
      };
    },
  });

  /* initialize the calendar
                             
                -----------------------------------------------------------------*/
  let del = false;
  let calendarEl = document.getElementById("calendar");
  let calendar = new Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid", "timeGrid", "list"],
    // customButtons: {
    //   deleteButton: {
    //     text: "Delete",
    //     click: function () {
    //       let events = document.getElementsByClassName("fc-time-grid-event");
    //       for (let index = 0; index < events.length; index++) {
    //         let event = events[index];
    //         event.style.filter = "brightness(50%)";
    //         del = true;
    //       }
    //     },
    //   },
    //   cancelButton: {
    //     text: "Cancel",
    //     click: function () {
    //       let events = document.getElementsByClassName("fc-time-grid-event");
    //       for (let index = 0; index < events.length; index++) {
    //         let event = events[index];
    //         event.style.filter = "brightness(100%)";
    //         del = false;
    //       }
    //     },
    //   },
    // },
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    firstDay: 1,
    editable: true,
    droppable: true,
    weekNumbers: true,
    overlay: false,
    weekNumbersWithinDays: true,
    navLinks: true, // can click day/week names to navigate views
    drop: function (arg) {
      // is the "remove after drop" checkbox checked?
      if (document.getElementById("drop-remove").checked) {
        // if so, remove the element from the "Draggable Events" list
        arg.draggedEl.parentNode.removeChild(arg.draggedEl);
      }
    },

    eventSources: [
      {
        url: "/get-event", // use the `url` property
        method: "GET",
      },

      {
        url: "/get-subject",
        method: "GET",
      },
    ],
    eventRender: function (info) {
      // let excludedWeeks = getAllIndexes(
      //   info.event.extendedProps.week.split(""),
      //   "*"
      // );
      // let theDate = info.event.start;
      // if (excludedWeeks.indexOf(getWeekNumber(theDate)) != -1) {
      //   return false;
      // }
      let department =
        info.event.extendedProps.department !== undefined
          ? info.event.extendedProps.department
          : info.event.department;
      if (department)
        $(info.el)
          .find(".fc-title")
          .append("<br>" + department);
    },
    eventClick: function (info) {
      if (del) {
        alert(info.event.title);
        del = false;
      } else {
        calendar.changeView("timeGridDay", info.event.start);
      }
    },
    eventReceive: function (info) {
      $.ajax({
        url: "/timetable",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: {
          id: info.event.id,
          url: info.event.url,
          title: info.event.title,
          start: info.event.start,
          color: info.event.color,
        },
        success: (data) => {
          data = JSON.parse(data);
          console.log(data.message);
        },
        error: (jqXHR, textStatus, err) => {
          console.log(err);
        },
      });
    },
    eventResize: function (info) {
      alert(info.event.title + " end is now " + info.event.end.toISOString());
    },
    //Receive event dragable
    eventDrop: function (info) {
      $.ajax({
        url: "/timetable",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: {
          id: info.event.id,
          url: info.event.url,
          title: info.event.title,
          start: info.event.start,
        },
        success: (data) => {
          data = JSON.parse(JSON.stringify(data));
          console.log(data.message);
        },
        error: (jqXHR, textStatus, err) => {
          console.log(err);
        },
      });
    },
    dateClick: function (info) {
      alert(info.date);
    },
  });
  calendar.render();
});