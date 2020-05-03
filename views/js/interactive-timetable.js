document.getElementById("timetablename").onchange = function () {
  window.location.href = this.children[this.selectedIndex].getAttribute("href");
};
const table = document.getElementById("table");
const rows = table.getElementsByTagName("tr");
const subjects = document.getElementsByClassName("subject");
const overlay = document.getElementById("overlay");
overlay.style.display = "none";

let color;
let name;

let state = false;

let arr = [];

const submit = () => {
  let form = document.createElement("form");
  let studytime = document.createElement("input");
  let subject = document.createElement("input");


  form.method = "POST";
  form.action = "/add-subject";

  studytime.value=arr.join(", ");
  console.log(arr);
  studytime.name="studytime";
  form.appendChild(studytime);
  subject.value=name;
  subject.name="idSubject";
  form.appendChild(subject);
  document.body.appendChild(form);
  form.submit();
};

const getStudyTime = (state) => {
  overlay.style.display = state ? "block" : "none";
  for (let i = 0; i < rows.length; i++) {
    //Get the cells in the given row
    let cells = rows[i].getElementsByTagName("td");
    for (let j = 0; j < cells.length; j++) {
      // Cell Object
      let cell = cells[j];
      cell.rowIndex = i;
      cell.positionIndex = j;
      cell.totalCells = cells.length;
      cell.totalRows = rows.length;
      // Track with onclick
      cell.onclick = function () {
        if (state) {
          if (cell.innerText === "") {
            cell.style.backgroundColor = color;
            cell.innerText = name;
            arr.push(`${this.positionIndex} ${this.rowIndex}`);
          }
        }
      };
    }
  }
};
for (let index = 0; index < subjects.length; index++) {
  const subject = subjects[index];
  subject.addEventListener(
    "click",
    function (e) {
      e = e || window.event;
      let target = e.target || e.srcElement;
      name = target.textContent || target.innerText;
      color = target.style.backgroundColor;
      overlay.style.display = "none";
    },
    false
  );
}

const toDate = (num) => {
  const date = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return date[num];
};
