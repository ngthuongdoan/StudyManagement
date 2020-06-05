const compareName = (a, b) => {
  return a.localeCompare(b);
};

const comparePlace = (a, b) => {
  return a.localeCompare(b);
};

const compareTime = (a, b) => {
  if (a<b) return 1;
  if (a>b) return -1;
  if (a - b === 0) return 0;
};

const compare = (type, a, b) => {
  switch (type) {
    case 0:
      return compareName(a, b);
    case 1:
      return comparePlace(a, b);
    case 2:
      return compareTime(a, b);
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
let [nameSorted, placeSorted, timeSorted] = [false, false, false];

const reset = () => {
  [nameSorted, placeSorted, timeSorted] = [false, false, false];
};

const sortTable = (n) => {
  const content = document.getElementsByClassName("content")[0];
  const cards = document.getElementsByClassName("linktodetail");
  const event_place = document.getElementsByClassName("event-place");
  const event_name = document.getElementsByClassName("event-name");
  const event_time = document.getElementsByClassName("time");

  // let data;
  switch (n) {
    case 0:
      if (!nameSorted) {
        reset();
        nameSorted = true;
        sortName(n, event_name, content, cards);
      }
      break;
    case 1:
      if (!placeSorted) {
        reset();
        placeSorted = true;
        sortPlace(n, event_place, content, cards);
      }
      break;
    case 2:
      if (!timeSorted) {
        reset();
        timeSorted = true;
        sortTime(n, event_time, content, cards);
      }
      break;
    default:
      break;
  }
};

const sortName = (n, event_name, content, cards) => {
  let arr = [];
  for (let i = 0; i < event_name.length; i++) {
    arr.push(event_name[i].innerText);
  }
  const sorted = quickSort(n, arr);
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < event_name.length; j++) {
      if (event_name[j].innerText == sorted[i]) {
        content.appendChild(cards[j]);
      }
    }
  }
};
const sortPlace = (n, event_place, content, cards) => {
  let arr = [];
  for (let i = 0; i < event_place.length; i++) {
    arr.push(event_place[i].innerText);
  }
  const sorted = quickSort(n, arr);
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < event_place.length; j++) {
      if (event_place[j].innerText == sorted[i]) {
        content.appendChild(cards[j]);
      }
    }
  }
};

const sortTime = (n, event_time, content, cards) => {
  let arr = [];
  const start = document.getElementsByClassName("start");

  for (let i = 0; i < start.length; i++) {
    arr.push(new Date(start[i].innerText.replace(" at ", "T")).toISOString());
  }
  const sorted = quickSort(n, arr);
  for (let i = 0; i < sorted.length; i++) {
    for (let j = 0; j < start.length; j++) {
      if (new Date(start[j].innerText.replace(" at ", "T")) - sorted[i]===0) {
        content.appendChild(cards[j]);
      }
    }
  }
};
