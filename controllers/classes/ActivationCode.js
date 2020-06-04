class AcitivationCode {
  constructor(code, expired) {
    this._code = code;
    this._expired = expired;
  }

  get code() {
    return this._code;
  }

  get expired() {
    return this._expired;
  }

  checkTime(time) {
    return time < this.expired;
  }
}

module.exports = AcitivationCode;
