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

  /* initialize the calendar
                             
                -----------------------------------------------------------------*/
  let del = false;
  let calendarEl = document.getElementById("calendar");
  let calendar = new Calendar(calendarEl, {
    plugins: ["interaction", "dayGrid", "timeGrid", "list"],

    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    firstDay: 1,
    allDaySlot: false,
    editable: true,
    droppable: true,
    weekNumbers: true,
    overlay: false,
    weekNumbersWithinDays: true,
    navLinks: true, // can click day/week names to navigate views
    defaultView: "timeGridWeek",
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
      calendar.changeView("timeGridDay", info.event.start);
    },
    // eventReceive: function (info) {
    //   $.ajax({
    //     url: "/event?_method=PUT",
    //     type: "POST",
    //     data: {
    //       type: "timetable",
    //       id: info.event.id,
    //       url: info.event.url,
    //       title: info.event.title,
    //       start: info.event.start,
    //       color: info.event.color,
    //     },
    //     success: (data) => {
    //       data = JSON.parse(data);
    //     },
    //     error: (jqXHR, textStatus, err) => {
    //       console.log(err);
    //     },
    //   });
    // },
    eventResize: function (info) {
      $.ajax({
        url: "/event?_method=PUT",
        type: "POST",
        data: {
          timetable: true,
          title: info.event.title,
          start: info.event.start,
          end: info.event.end,
          department: info.event.extendedProps.department,
          note: info.event.extendedProps.note,
          backgroundColor: info.event.backgroundColor,
        },
        success: (data) => {
          Swal.fire({
            icon: "success",
            title: "Updated!!!",
          });
        },
        error: (jqXHR, textStatus, err) => {
          Swal.fire({
            icon: "error",
            title: "Problem Occur. Please refresh and try again!!!",
          });
        },
      });
    },
    //Receive event dragable
    eventDrop: function (info) {
      $.ajax({
        url: "/event?_method=PUT",
        type: "POST",
        data: {
          timetable: true,
          title: info.event.title,
          start: info.event.start,
          end: info.event.end,
          department: info.event.extendedProps.department,
          note: info.event.extendedProps.note,
          backgroundColor: info.event.backgroundColor,
        },
        success: (data) => {
          Swal.fire({
            icon: "success",
            title: "Updated!!!",
          });
        },
        error: (jqXHR, textStatus, err) => {
          Swal.fire({
            icon: "error",
            title: "Problem Occur. Please refresh and try again!!!",
          });
        },
      });
    },
  });
  calendar.render();
});
