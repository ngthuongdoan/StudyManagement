const compareTeacherName = (a, b) => {
  var splitA = a.split(" ");
  var splitB = b.split(" ");
  var lastA = splitA[splitA.length - 1];
  var lastB = splitB[splitB.length - 1];

  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  return 0;
};
const compareName = (a, b) => {
  var splitA = a.split(" ");
  var splitB = b.split(" ");
  var lastA = splitA[splitA.length - 1];
  var lastB = splitB[splitB.length - 1];

  if (lastA < lastB) return -1;
  if (lastA > lastB) return 1;
  return 0;
};

const compareID = (a, b) => {
  return a.localeCompare(b);
};

const compareTarget = (a, b) => {
  return a.localeCompare(b);
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

const QuickSort = (type, arr, left = 0, right = arr.length - 1) => {
  let len = arr.length,
    index;
  if (len > 1) {
    index = partition(type, arr, left, right);
    if (left < index - 1) {
      QuickSort(type, arr, left, index - 1);
    }
    if (index < right) {
      QuickSort(type, arr, index, right);
    }
  }
  return arr;
};

const partition = (type, arr, left, right) => {
  let middle = Math.floor((right + left) / 2),
    pivot = arr[middle],
    i = left, // Start pointer at the first item in the array
    j = right; // Start pointer at the last item in the array
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

function sortTable(n) {
  var i;
  var content = document.getElementsByClassName("content")[0];
  var cards = document.getElementsByClassName("linktodetail");
  var data;
  switch (n) {
    case 2:
      {
        data = document.getElementsByClassName("subject-teacher");
        let arr = [];
        for (i = 0; i < data.length; i++) {
          arr.push(data[i].innerText);
        }
        let sorted = QuickSort(n, arr);
        console.log(sorted);
        for (i = 0; i < sorted.length; i++) {
          for (j = 0; j < data.length; j++) {
            if (data[j].innerText == sorted[i]) {
              content.appendChild(cards[j]);
            }
          }
        }
      }
      break;
    case 3:
      {
        data = document.getElementsByClassName("subject-name");

        let arr = [];
        for (i = 0; i < data.length; i++) {
          arr.push(data[i].innerText.split(" ")[0]);
        }
        let sorted = QuickSort(n, arr);
        console.log(sorted);
        for (i = 0; i < sorted.length; i++) {
          for (j = 0; j < data.length; j++) {
            if (data[j].innerText.split(" ")[0] == sorted[i]) {
              content.appendChild(cards[j]);
            }
          }
        }
      }
      break;
    default:
      break;
  }
}
