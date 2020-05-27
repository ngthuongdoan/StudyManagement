/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function () {
  let Calendar = FullCalendar.Calendar;
  let Draggable = FullCalendarInteraction.Draggable;

  // let weekOfYear = function (date) {
  //   let d = new Date(+date);
  //   d.setHours(0, 0, 0);
  //   d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  //   return Math.ceil(((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7 + 1) / 7);
  // };
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
      right:
        "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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
  });
  calendar.render();
});
