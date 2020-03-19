
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
  submitForm(data);
};

const validate = () => {
  let studyTime = document.getElementById("studyTime").value;

  console.log(studyTime);
  try {
    let values = studyTime.split(";");
    values.forEach(value => {
      let [day, period] = value.trim().split(" ");
      if (period.length !== 2) throw new Error("Periods Error");
      if (!+period) throw new Error("NaN");
      let [start, end] = period.split("");
    });
    document.getElementById("addform").submit();
    return true;
  } catch (e) {
    /* eslint-disable */
    Swal.fire({
      icon: "error",
      title: "Oops..."
    });
    /* eslint-disable */
    return false;
  }
};
const submitForm = data => {
  for (const el of data) {
    el.addEventListener("click", () => {
      let [id] = el.children[1].innerText.split(" ");
      document.getElementById("delid").setAttribute("value", id);
      document.getElementById("delete").submit();
    });
  }
};
