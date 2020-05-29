/* eslint-disable no-undef */
/**
 * Function delete a subject
 * @param None
 */
const deleteSubject = () => {
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
  const data = document.getElementsByClassName("subject-card");
  submitForm(data);
};

/**
 * Function submit delete a subject
 * @param None
 */
const submitForm = (data) => {
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
      })
      .then((result) => {
        if (result.value) {
          let [id] = el.children[1].innerText.split(" ");
          let form = document.createElement("form");
          form.style.display = "none";
          let idSubject = document.createElement("input");
          form.method = "POST";
          form.action = "/subject?_method=DELETE";
          idSubject.value = id;
          idSubject.name = "idSubject";
          form.appendChild(idSubject);
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
const validate = () => {
  const idSubject = document.getElementById("idSubject");
  const subjectDay = document.getElementById("subjectDay");
  const subjectStartRecur = document.getElementById("subjectStartRecur");
  const subjectEndRecur = document.getElementById("subjectEndRecur");
  const subjectStartTime = document.getElementById("subjectStartTime");
  const subjectEndTime = document.getElementById("subjectEndTime");
  const subjectTarget = document.getElementById("subjectTarget");
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
  const idCheck = idSubject.value.search(idRegex) == -1 ? false : true;
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
  if (
    (Number.parseFloat(subjectTarget.value) < 0) |
    (Number.parseFloat(subjectTarget.value) > 10)
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Target",
    });
    return false;
  }
  return true;
};
