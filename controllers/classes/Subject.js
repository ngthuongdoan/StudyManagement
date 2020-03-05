class Subject {
  constructor({
    id,
    teachername,
    teacheremail,
    subjectname,
    room = "",
    studytime = "",
    target,
    note = ""
  }) {
    this._id = id;
    this._teachername = teachername;
    this._teacheremail = teacheremail;
    this._subjectname = subjectname;
    this._room = room;
    this._studytime = studytime;
    this._target = target;
    this._note = note;
  }
  get id() {
    return this._id;
  }
  get teachername() {
    return this._teachername;
  }
  get teacheremail() {
    return this._teacheremail;
  }
  get subjectname() {
    return this._subjectname;
  }
  get room() {
    return this._room;
  }
  get studytime() {
    return this._studytime;
  }
  get target() {
    return this._target;
  }
  get note() {
    return this._note;
  }

  send() {
    return [
      this.id,
      this.teachername,
      this.teacheremail,
      this.subjectname,
      this.room,
      this.studytime,
      this.target,
      this.note
    ];
  }
}

module.exports = Subject;
