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

const showDate = () => {
  // var form = document.createElement("form");
  // var element1 = document.createElement("input");
  // var element2 = document.createElement("input");

  // form.method = "POST";
  // form.action = "login.php";

  // element1.value="un";
  // element1.name="un";
  // form.appendChild(element1);

  // element2.value="pw";
  // element2.name="pw";
  // form.appendChild(element2);

  // document.body.appendChild(form);

  // form.submit();
  let result = [];
  
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
            arr.push(`${toDate(this.positionIndex)}, ${this.rowIndex}`);
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
