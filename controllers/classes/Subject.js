class Subject {
  constructor({
    idSubject,
    subjectName,
    teacherEmail,
    subjectRoom,
    subjectWeek,
    subjectDay,
    subjectStartRecur,
    subjectEndRecur,
    subjectStartTime,
    subjectEndTime,
    subjectTarget = "",
    subjectNote = "",
    subjectColor = "FFFFFF",
  }) {
    this.id = idSubject;
    this.start = subjectStartTime+":00";
    this.end = subjectEndTime+":00";
    this.title = subjectName;
    this.department = subjectRoom;
    this.week = subjectWeek;
    this.day = subjectDay;
    this.startRecur = subjectStartRecur;
    this.endRecur = subjectEndRecur;
    this.target = subjectTarget;
    this.note = subjectNote;
    this.teacherEmail = teacherEmail;
    this.backgroundColor = subjectColor;
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
