/* eslint-disable no-undef */
document.addEventListener("DOMContentLoaded", function () {
  var Calendar = FullCalendar.Calendar;
  var Draggable = FullCalendarInteraction.Draggable;

  /* initialize the external events
                                  -----------------------------------------------------------------*/

  var containerEventsEl = document.getElementById("external-events-list");
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

  var containerSubjectsEl = document.getElementById("external-subjects-list");
  new Draggable(containerSubjectsEl, {
    itemSelector: ".fc-subject",
    eventData: function (subjectEl) {
      let data = subjectEl.dataset.event;
      data = JSON.parse(data);
      // let department = (undefined === data.extendedProps.department)?"":data.extendedProps.department;
      return {
        title: data.title,
        backgroundColor: data.backgroundColor,
        // extendedProps: {
        //   department: department,
        // },
      };
    },
  });

  /* initialize the calendar
                             
                -----------------------------------------------------------------*/
  var del = false;
  var calendarEl = document.getElementById("calendar");
  var calendar = new Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid", "timeGrid", "list"],
    customButtons: {
      deleteButton: {
        text: "Delete",
        click: function () {
          let events = document.getElementsByClassName("fc-time-grid-event");
          for (let index = 0; index < events.length; index++) {
            let event = events[index];
            event.style.filter = "brightness(50%)";
            del = true;
          }
        },
      },
      cancelButton: {
        text: "Cancel",
        click: function () {
          let events = document.getElementsByClassName("fc-time-grid-event");
          for (let index = 0; index < events.length; index++) {
            let event = events[index];
            event.style.filter = "brightness(100%)";
            del = false;
          }
        },
      },
    },
    header: {
      left: "prev,next today",
      center: "title",
      right:
        "deleteButton,cancelButton dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
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
      if (info.event.extendedProps.department)
        $(info.el)
          .find(".fc-title")
          .append("<br>" + info.event.extendedProps.department);
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
