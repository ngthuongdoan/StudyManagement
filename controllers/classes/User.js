const bcrypt = require("bcrypt");

class User {
  constructor(username, pass, fullname, email, education, avatar, firsttime) {
    this._username = username;
    this._pass = bcrypt.hashSync(pass, 10);
    this._fullname = fullname;
    this._email = email;
    this._education = education;
    this._avatar = avatar;
    this._firsttime = firsttime;
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
  get firsttime() {
    return this._firsttime;
  }
  send() {
    return [this._username,this.password,this._fullname,this._email,this._education,this._avatar,this._firsttime];
  }
}

// const user = new User('ngthuongdoan','ngthuongdoan','ngthuongdoan','ngthuongdoan@gmail.com','ngthuongdoan','',true)
// console.log(user.password)
module.exports = User;
