const submitForm = () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let error = false;
  init();
  if (username.includes(" ")) {
    document.getElementById(
      "usernameError"
    ).textContent = `Username mustn't have space`;
    error = true;
  }
  if (password.length < 6) {
    document.getElementById(
      "passwordError"
    ).textContent = `Password must have at least 6 characters`;
    error = true;
  }
  if (!error) {
    document.getElementById("form").submit();
  } else event.preventDefault();
};

const init = () => {
  document.getElementById("usernameError").textContent = "";
  document.getElementById("passwordError").textContent = "";
};
