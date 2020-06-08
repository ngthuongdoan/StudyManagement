/* eslint-disable no-undef */
const deleteTeacher = () => {
  document.getElementById("message").style.display = "block";
  let btn = document.getElementById("delbtn");
  btn.textContent = "Cancel";
  btn.addEventListener("click", () => {
    window.location.reload();
  });

  const data = document.getElementsByClassName("teacher");
  submitDelForm(data);
};

const submitModifyForm = () => {
  event.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Update it!",
  }).then((result) => {
    if (result.value) {
      $("#modifyForm").submit();
    }
  });
};

const submitDelForm = (data) => {
  for (const el of data) {
    el.classList.add("activerow");
    el.onclick = false;
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
          form.action = "/teacher?_method=DELETE";

          let teacherName = document.createElement("input");
          teacherName.value = el.children[0].innerText;
          teacherName.name = "teacherName";
          form.appendChild(teacherName);

          let teacherEmail = document.createElement("input");
          teacherEmail.value = el.children[1].innerText;
          teacherEmail.name = "teacherEmail";
          form.appendChild(teacherEmail);

          let teacherNumber = document.createElement("input");
          teacherNumber.value = el.children[0].innerText;
          teacherNumber.name = "teacherNumber";
          form.appendChild(teacherNumber);
          document.body.appendChild(form);
          form.submit();
        }
      });
    });
  }
};

const submitAddForm = () => {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "/teacher",
    data: {
      teacherName: $("#teacherName").val(),
      teacherEmail: $("#teacherEmail").val(),
      teacherNumber: $("#teacherNumber").val(),
    },
    success: () => {
      window.location = "/teacher";
    },
    error: function () {
      Swal.fire({
        icon: "error",
        title: "Duplicate!",
      });
    },
  });
};

const data = document.getElementsByClassName("teacher");
for (let index = 0; index < data.length; index++) {
  const teacher = data[index];
  teacher.addEventListener("click", () => {
    document.getElementById("modifyName").value = teacher.children[0].innerText;
    document.getElementById("modifyEmail").value =
      teacher.children[1].innerText;
    document.getElementById("modifyNumber").value =
      teacher.children[2].innerText;
    modifyOverlayOn();
  });
}
