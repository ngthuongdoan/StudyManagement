/* eslint-disable no-undef */
const deleteSubject = () => {
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

const submitDelForm = (data) => {
  for (const el of data) {
    el.addEventListener("click", () => {
      let [id] = el.children[1].innerText.split(" ");
      document.getElementById("delid").setAttribute("value", id);
      document.getElementById("delete").submit();
    });
  }
};

/**Function check add subject input
 * @param None
 * @return {Boolean} isChecked - true for submit form
 */
const validate = () => {
  const idSubject = document.getElementById("idSubject");
  const subjectWeek = document.getElementById("subjectWeek");
  const subjectDay = document.getElementById("subjectDay");
  const subjectStartRecur = document.getElementById("subjectStartRecur");
  const subjectEndRecur = document.getElementById("subjectEndRecur");
  const subjectStartTime = document.getElementById("subjectStartTime");
  const subjectEndTime = document.getElementById("subjectEndTime");
  const subjectTarget = document.getElementById("subjectTarget");
  const subjectNote = document.getElementById("subjectNote");
  const subjectColor = document.getElementById("subjectColor");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // console.log(idSubject.search(idRegex));
  // //Check id
  const idRegex = /^[A-Z]{2}[0-9]{5}$/gi;
  const idCheck = ((idSubject.value).search(idRegex) == -1)? false : true;
  if (!idCheck) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid ID",
    });
    return false;
  }

  //Convert days
  if (days.indexOf(subjectDay.value) === -1) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid day",
    });
    return false;
  } else {
    subjectDay.value = days.indexOf(subjectDay.value);
  }

  //Check start-end
  if (new Date(subjectStartRecur.value) > new Date(subjectEndRecur.value)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Start Day geater than End Day",
    });
    return false;
  }

  //Check time
  const [shour, sminute] = subjectStartTime.value.split(":");
  const [ehour, eminute] = subjectEndTime.value.split(":");

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

  //Check target
  if ((Number.parseFloat(subjectTarget.value) < 0) | (Number.parseFloat(subjectTarget.value) > 10)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Target",
    });
    return false;
  }

  return true;
};
