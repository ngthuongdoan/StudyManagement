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
  if (password.length < 6 || password.includes(' ')) {
    document.getElementById(
      "passwordError"
    ).textContent = `Password must have at least 6 characters and not contains space`;
    error = true;
  }
  if (error) {
    return false;
  } 
  return true;
};

const init = () => {
  document.getElementById("usernameError").textContent = "";
  document.getElementById("passwordError").textContent = "";
};
