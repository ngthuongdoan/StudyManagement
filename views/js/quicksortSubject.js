const compareTeacherName = (a, b) => {
  const splitA = a.split(" ");
  const splitB = b.split(" ");
  const lastA = splitA[splitA.length - 1];
  const lastB = splitB[splitB.length - 1];

  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  return 0;
};
const compareName = (a, b) => {
  return a.localeCompare(b);
};

const compareID = (a, b) => {
  return a.localeCompare(b);
};

const compareTarget = (a, b) => {
  if (+a < +b) return 1;
  if (+a > +b) return -1;
  if (+a == +b) return 0;
};

const compare = (type, a, b) => {
  switch (type) {
    case 0:
      return compareName(a, b);
    case 1:
      return compareID(a, b);
    case 2:
      return compareTeacherName(a, b);
    case 3:
      return compareTarget(a, b);
    default:
      break;
  }
};

const quickSort = (type, arr, left = 0, right = arr.length - 1) => {
  const len = arr.length;
  let index;
  if (len > 1) {
    index = partition(type, arr, left, right);
    if (left < index - 1) {
      quickSort(type, arr, left, index - 1);
    }
    if (index < right) {
      quickSort(type, arr, index, right);
    }
  }
  return arr;
};

const partition = (type, arr, left, right) => {
  const middle = Math.floor((right + left) / 2);
  const pivot = arr[middle];
  let i = left; // Start pointer at the first item in the array
  let j = right; // Start pointer at the last item in the array
  while (i <= j) {
    // Move left pointer to the right until the value at the
    // left is greater than the pivot value
    while (compare(type, arr[i], pivot) == -1) {
      i++;
    }
    // Move right pointer to the left until the value at the
    // right is less than the pivot value
    while (compare(type, arr[j], pivot) == 1) {
      j--;
    }
    // If the left pointer is less than or equal to the
    // right pointer, then swap values
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // ES6 destructuring swap
      i++;
      j--;
    }
  }
  return i;
};
let [nameSorted, idSorted, teacherSorted, targetSorted] = [
  false,
  false,
  false,
  false
];

const reset=()=>{
  [nameSorted, idSorted, teacherSorted, targetSorted] = [
    false,
    false,
    false,
    false
  ];
};

const sortTable = n => {
  const content = document.getElementsByClassName("content")[0];
  const cards = document.getElementsByClassName("linktodetail");
  const subject_teacher = document.getElementsByClassName("subject-teacher");
  const subject_target = document.getElementsByClassName("subject-target");
  const subject_name = document.getElementsByClassName("subject-name");
  const subject_id = document.getElementsByClassName("subject-id");
  // let data;
  switch (n) {
    case 0:
      if (!nameSorted) {
        reset();
        nameSorted = true;
        sortName(n, subject_name, content, cards);
      }
      break;
    case 1:
      if (!idSorted) {
        reset();
        idSorted = true;
        sortId(n, subject_id, content, cards);
      }
      break;
    case 2:
      if (!teacherSorted) {
        reset();
        teacherSorted = true;
        sortTeacherName(n, subject_teacher, content, cards);
      }
      break;
    case 3:
      if (!targetSorted) {
        reset();
        targetSorted = true;
        sortTarget(n, subject_target, content, cards);
      }
      break;
    default:
      break;
  }
};

const sortName = (n, subject_name, content, cards) => {
  let arr = [];
  for (let i = 0; i < subject_name.length; i++) {
    arr.push(subject_name[i].innerText);
  }
  const sorted = quickSort(n, arr);
  console.log(sorted);
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < subject_name.length; j++) {
      if (subject_name[j].innerText == sorted[i]) {
        content.appendChild(cards[j]);
      }
    }
  }
};
const sortId = (n, subject_id, content, cards) => {
  let arr = [];
  for (let i = 0; i < subject_id.length; i++) {
    arr.push(subject_id[i].innerText);
  }
  const sorted = quickSort(n, arr);
  console.log(sorted);
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < subject_id.length; j++) {
      if (subject_id[j].innerText == sorted[i]) {
        content.appendChild(cards[j]);
      }
    }
  }
};

const sortTeacherName = (n, subject_teacher, content, cards) => {
  let arr = [];
  for (let i = 0; i < subject_teacher.length; i++) {
    arr.push(subject_teacher[i].innerText);
  }
  const sorted = quickSort(n, arr);
  console.log(sorted);
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < subject_teacher.length; j++) {
      if (subject_teacher[j].innerText == sorted[i]) {
        content.appendChild(cards[j]);
      }
    }
  }
};
const sortTarget = (n, subject_target, content, cards) => {
  let arr = [];
  for (let i = 0; i < subject_target.length; i++) {
    arr.push(subject_target[i].innerText);
  }
  const sorted = quickSort(n, arr);
  console.log(sorted);
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < subject_target.length; j++) {
      if (subject_target[j].innerText == sorted[i]) {
        content.appendChild(cards[j]);
      }
    }
  }
};
