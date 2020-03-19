const days = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6
};
class Subject {
  constructor({
    id,
    teachername,
    teacheremail,
    subjectname,
    room = "",
    studytime = "",
    target,
    note = "",
    color=""
  }) {
    this._id = id;
    this._teachername = teachername;
    this._teacheremail = teacheremail;
    this._subjectname = subjectname;
    this._room = room;
    this._studytime = studytime.replace(/Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/gi, function(matched) {
      return days[matched];
    });
    this._target = target;
    this._note = note;
    this._color = `#${color}`;
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
  get color() {
    return this._color;
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
      this.note,
      this.color
    ];
  }
}

module.exports = Subject;
