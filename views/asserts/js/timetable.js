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
            return {
                title: eventEl.innerText.trim(),
            };
        },
    });

    var containerSubjectsEl = document.getElementById(
        "external-subjects-list"
    );
    new Draggable(containerSubjectsEl, {
        itemSelector: ".fc-subject",
        eventData: function (subjectEl) {
            // console.log(subjectEl.dataset.event);
            let data = JSON.parse(subjectEl.dataset.event);
            return {
                title: data.title,
                backgroundColor: data.backgroundColor,
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
                    let events = document.getElementsByClassName(
                        "fc-time-grid-event"
                    );
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
                    let events = document.getElementsByClassName(
                        "fc-time-grid-event"
                    );
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
        overlay:false,
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
                method: "GET"
            },
            // {
            //     events: [
            //         {    
            //             // standard property
            //             title: "my recurring event",
        
            //             // ...or, an object...
            //             rrule: {
            //                 freq: "weekly",
            //                 byweekday: ["mo", "fr"],
            //                 dtstart: "2020-02-01T10:30:00",
            //                 until: "2020-06-01"
            //             },
        
            //             // for specifying the end time of each instance
            //             duration: "02:00"
            //         },],
            // }
            {
                url: "/get-subject",
                method: "GET"
            }
        ],
        //This is for Subject
        // {
        //   title: "rrule event",
        //   rrule: {
        //     dtstart: "2020-02-09T13:00:00",
        //     until: "2020-02-01",
        //     freq: "weekly"
        //   },
        //   duration: "02:00"
        // }

            // {
            //     backgroundColor: "#333333",
            //     extendedPros: {
            //         note: null,
            //         room: null,
            //         target: "10",
            //         teacherEmail: "vhtram@cit.ctu.edu.vn",
            //         week: "123**678901234567**",
            //     },
            //     id: "CT239",
            //     rrule: {
            //         byweekday: ["mo", "fr"],
            //         // byweekno: [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
            //         dtstart: "2020-01-01T06:00:00.000Z",
            //         freq: "weekly",
            //         until: "2020-07-04T17:00:00.000Z",
            //         wkst: "2020-01-01T06:00:00.000Z"
            //     },
            //     title: "Niên luận cơ sở",
            //     duration: "3:00"
            // },
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
                    $("#name").text(data.message);
                },
                error: (jqXHR, textStatus, err) => {
                    console.log(err);
                },
            });
        },
        eventResize: function (info) {
            alert(
                info.event.title + " end is now " + info.event.end.toISOString()
            );
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
                    $("#name").text(data.message);
                },
                error: (jqXHR, textStatus, err) => {
                    console.log(err);
                },
            });
        },
    });
    calendar.render();
});