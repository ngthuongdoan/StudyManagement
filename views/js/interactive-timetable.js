
/**
 * Change timetable when choosen
 */
document.getElementById("timetablename").onchange = function () {
  window.location.href = this.children[this.selectedIndex].getAttribute("href");
};

//Get elements needed
const table = document.getElementById("table");
const rows = table.getElementsByTagName("tr");
const subjects = document.getElementsByClassName("subject");
const overlay = document.getElementById("overlay");
overlay.style.display = "none";

let color;
let name;
let state = false;
let arr = [];

/**
 * Create on click event listener when a cell is clicked.
 */
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


/**
 * Submit Form when the Done-button clicked. 
 * POST studyTime to the database
 * @author ngthuongdoan
 * @return {void} Nothing
 */
const submit = () => {
  if (arr.length !== 0) {
    let form = document.createElement("form");
    form.style.display = "none";
    let studytime = document.createElement("input");
    let subject = document.createElement("input");
    form.method = "POST";
    form.action = "/add-subject";
    studytime.value = arr.join(", ");
    console.log(arr);
    studytime.name = "studytime";
    form.appendChild(studytime);
    subject.value = name;
    subject.name = "idSubject";
    form.appendChild(subject);
    document.body.appendChild(form);
    form.submit();
  }
};

/**
 * Change arr param to get studyTime on click.
 * Delete when re-clicked
 * @param {Boolean} state - Define that should be overlayed or not
 */
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


