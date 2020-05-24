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

const validate = () => {
  const form = document.getElementById("addform");
  const idSubject = document.getElementById("idSubject");
  const teacherEmail = document.getElementById("teacherEmail");
  const subjectName = document.getElementById("subjectName");
  const subjectRoom = document.getElementById("subjectRoom");
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
  let isCheck = true;
  //Convert days
  if (days.indexOf(subjectDay.value) === -1) {
    isCheck = false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid day",
    });
  } else {
    subjectDay.value = days.indexOf(subjectDay.value);
    isCheck = true;
  }
  //Check start-end
  if (new Date(subjectStartRecur.value) > new Date(subjectEndRecur.value)) {
    isCheck = false;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Start Day geater than End Day",
    });
  }

  //Check time
  return isCheck;

};
