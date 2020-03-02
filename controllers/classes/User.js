const bcrypt = require("bcrypt");

class User {
  constructor({
    username,
    pass,
    fullname,
    email,
    education,
    avatar = "avatar-placeholder.png"
  }) {
    this._username = username;
    this._pass = bcrypt.hashSync(pass, 10);
    this._fullname = fullname;
    this._email = email;
    this._education = education;
    this._avatar = avatar;
  }
  get username() {
    return this._username;
  }
  get password() {
    return this._pass;
  }
  get fullname() {
    return this._fullname;
  }
  get email() {
    return this._email;
  }
  get education() {
    return this._education;
  }
  get avatar() {
    return this._avatar;
  }
  send() {
    return [
      this._username,
      this.password,
      this._fullname,
      this._email,
      this._education,
      this._avatar
    ];
  }
}

module.exports = User;
