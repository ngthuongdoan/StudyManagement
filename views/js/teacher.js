const deleteTeacher = () => {
  document.getElementById("message").style.display = "block";
  let btn = document.getElementById("delbtn");
  btn.textContent = "Cancel";
  btn.addEventListener("click", ()=>{
    window.location.reload()
  });

  const data = document.getElementsByClassName("teacher");
  submitForm(data);
};

const submitForm = data => {
  for (const el of data) {
    el.classList.add("activerow");
    el.addEventListener("click", () => {
      document
        .getElementById("delname")
        .setAttribute("value", el.children[0].innerText);
      document
        .getElementById("delemail")
        .setAttribute("value", el.children[1].innerText);
      document
        .getElementById("delnum")
        .setAttribute("value", el.children[2].innerText);
      document.getElementById("delete").submit();
    });
  }
};
