/* eslint-disable no-undef */
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
    a[i].setAttribute("href", "");
  }
  const data = document.getElementsByClassName("subject-card");
  submitDelForm(data);
};

/**
 * Function submit delete a subject
 * @param None
 */
const submitDelForm = (data) => {
  for (const el of data) {
    el.addEventListener("click", () => {
      let form = document.createElement("form");
      form.style.display = "none";
      form.method = "POST";
      form.action = "/delete-event";
      let eventName = document.createElement("input");
      eventName.value = id;
      eventName.name = "eventName";
      form.appendChild(eventName);
      document.body.appendChild(form);
      console.log(form.toString());
      form.submit();
    });
  }
};


/**Function check add subject input
 * @param None
 * @return {Boolean} isChecked - true for submit form
 */
const validate = () => {
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
