/* eslint-disable no-undef */
const data = document.getElementsByClassName("event-card");

for (let index = 0; index < data.length; index++) {
  const event = data[index];
  event.addEventListener("click", () => {
    const eventData = JSON.parse(event.dataset.event);
    document.getElementById("modifyEventName").value = eventData.title;
    const [eventStartDate, eventStartTime] = eventData.start.split("T");
    const [eventEndDate, eventEndTime] = eventData.end.split("T");

    document.getElementById("modifyEventStartDate").value = eventStartDate;
    document.getElementById("modifyEventEndDate").value = eventEndDate;
    document.getElementById("modifyEventStartTime").value = eventStartTime.slice(0,5);
    document.getElementById("modifyEventEndTime").value = eventEndTime.slice(0,5);
    document.getElementById("modifyEventPlace").value =
      eventData.extendedProps.department;
    document.getElementById("modifyEventNote").value =
      eventData.description;
    document.getElementById("modifyEventColor").value =
      eventData.backgroundColor;
  });
}
/**
 * Function delete a event
 * @param None
 */
const deleteEvent = () => {
  document.getElementById("message").style.display = "block";
  let btn = document.getElementById("delbtn");
  btn.textContent = "Cancel";
  btn.addEventListener("click", () => {
    window.location.reload();
  });
  let a = document.getElementsByClassName("linktodetail");
  for (let i = 0; i < a.length; i++) {
    a[i].onclick = () => false;
  }
  submitDelForm(data);
};

/**
 * Function submit delete a subject
 * @param None
 */
const submitDelForm = (data) => {
  for (const el of data) {
    el.addEventListener("click", () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          let form = document.createElement("form");
          form.style.display = "none";
          form.method = "POST";
          form.action = "/event?_method=DELETE";
          let eventName = document.createElement("input");
          const name = document.getElementsByClassName("event-name")[0]
            .innerHTML;
          eventName.value = name;
          eventName.name = "eventName";
          form.appendChild(eventName);
          document.body.appendChild(form);
          form.submit();
        }
      });
    });
  }
};

/**Function check add subject input
 * @param None
 * @return {Boolean} isChecked - true for submit form
 */
const addValidate = () => {
  const eventStartDate = document.getElementById("eventStartDate");
  const eventEndDate = document.getElementById("eventEndDate");
  const eventStartTime = document.getElementById("eventStartTime");
  const eventEndTime = document.getElementById("eventEndTime");

  //Check start-end
  if (new Date(eventStartDate.value) > new Date(eventEndDate.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Start Day geater than End Day",
    });
    return false;
  }

  //Check time
  const [shour, sminute] = eventStartTime.value.split(":");
  const [ehour, eminute] = eventEndTime.value.split(":");

  if (shour > ehour) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Start Time geater than End Time",
    });
    return false;
  } else if (shour == ehour) {
    if (sminute >= eminute) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start Time geater than End Time",
      });
      return false;
    }
  }
  return true;
};

/**Function check add subject input
 * @param None
 * @return {Boolean} isChecked - true for submit form
 */
const modifyValidate = () => {
  const eventStartDate = document.getElementById("modifyEventStartDate");
  const eventEndDate = document.getElementById("modifyEventEndDate");
  const eventStartTime = document.getElementById("modifyEventStartTime");
  const eventEndTime = document.getElementById("modifyEventEndTime");

  //Check start-end
  if (new Date(eventStartDate.value) > new Date(eventEndDate.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Start Day geater than End Day",
    });
    return false;
  }

  //Check time
  const [shour, sminute] = eventStartTime.value.split(":");
  const [ehour, eminute] = eventEndTime.value.split(":");

  if (shour > ehour) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Start Time geater than End Time",
    });
    return false;
  } else if (shour == ehour) {
    if (sminute >= eminute) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start Time geater than End Time",
      });
      return false;
    }
  }
  return true;
};
