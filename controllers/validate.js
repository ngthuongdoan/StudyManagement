exports.isValid = (username, password) => {
  if (username.match(/ /gi)) return false;
  if ((password.lenght < 6) | password.match(/ /gi)) return false;
  return true;
};
