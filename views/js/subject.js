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

const submitForm = data => {
  for (const el of data) {
    el.addEventListener("click", () => {
      let [id] = el.children[1].innerText.split(" ");
      document.getElementById("delid").setAttribute("value", id);
      document.getElementById("delete").submit();
    });
  }
};
