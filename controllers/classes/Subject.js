class Subject {
  constructor({
    id,
    title,
    teacherEmail,
    department,
    week,
    day,
    startRecur,
    endRecur,
    start,
    end,
    target = "",
    note = "",
    backgroundColor = "FFFFFF",
  }) {
    this._id = id;
    this._start = start;
    this._end = end;
    this._title = title;
    this._department = department;
    this._week = week;
    this._day = day;
    this._startRecur = startRecur;
    this._endRecur = endRecur;
    this._target = target;
    this._note = note;
    this._teacherEmail = teacherEmail;
    this._backgroundColor = backgroundColor;
  }

  get id(){
    return this._id;
  }

  get start(){
    return this._start;
  }
  get end(){
    return this._end;
  }
  get title(){
    return this._title;
  }
  get department(){
    return this._department;
  }
  get week(){
    return this._week;
  }
  get day(){
    return this._day;
  }
  get startRecur(){
    return this._startRecur;
  }
  get endRecur(){
    return this._endRecur;
  }
  get target(){
    return this._target;
  }
  get note(){
    return this._note;
  }
  get teacherEmail(){
    return this._teacherEmail;
  }
  get backgroundColor(){
    return this._backgroundColor;
  }

  post() {
    return [
      this.id,
      this.teacherEmail,
      this.title,
      this.department,
      this.week,
      [this.day],
      new Date(this.startRecur),
      new Date(this.endRecur),
      this.start,
      this.end,
      +this.target,
      this.note,
      this.backgroundColor,
      null
    ];
  }
  
  send() {
    return {
      id: this.id,
      title: this.title,
      department: this.department,
      week: this.week,
      target: this.target,
      note: this.note,
      teacherEmail: this.teacherEmail,
      daysOfWeek: this.day.split(","),
      startTime: this.start,
      endTime: this.end,
      startRecur: this.startRecur,
      endRecur: this.endRecur,
      backgroundColor: this.backgroundColor,
      editable: false,
    };
  }
}

module.exports = Subject;
