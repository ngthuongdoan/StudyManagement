const submitForm = () => {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let confirm = document.getElementById("confirm").value;

  let error = false;
  init();
  if (username.includes(" ")) {
    document.getElementById(
      "usernameError"
    ).textContent = `Username mustn't have space`;
    error = true;
  }
  if (password.length < 6 || password.includes(" ")) {
    document.getElementById(
      "passwordError"
    ).textContent = `Password must have at least 6 characters and not contains space`;
    error = true;
  } else {
    if (confirm !== password) {
      document.getElementById(
        "passwordError"
      ).textContent = `Please confirm your password again`;
      error = true;
    }
  }
  return error ? false : true;
};

const init = () => {
  document.getElementById("usernameError").textContent = "";
  document.getElementById("passwordError").textContent = "";
};
