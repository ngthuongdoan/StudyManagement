class Subject {
  constructor({
    idSubject,
    subjectName,
    teacherEmail,
    subjectRoom = "",
    subjectWeek,
    subjectDay,
    subjectStartRecur,
    subjectEndRecur,
    subjectStartTime,
    subjectEndTime,
    subjectTarget = "",
    subjectNote = "",
    subjectColor = "#FFFFFF",
  }) {
    this.id = idSubject;
    this.start = subjectStartTime;
    this.end = subjectEndTime;
    this.title = subjectName;
    this.room = subjectRoom;
    this.week = subjectWeek;
    this.day = subjectDay;
    this.startRecur = subjectStartRecur;
    this.endRecur = subjectEndRecur;
    this.target = subjectTarget;
    this.note = subjectNote;
    this.teacherEmail = teacherEmail;
    this.backgroundColor = subjectColor;
  }

  send() {
    return {
      id: this.id,
      title: this.title,
      extendedPros: {
        room: this.room,
        week: this.week,
        target: this.target,
        note: this.note,
        teacherEmail: this.teacherEmail,
      },
      daysOfWeek: this.day.split(","),
      startTime: this.start,
      endTime: this.end,
      startRecur: this.startRecur,
      endRecur: this.endRecur,
      backgroundColor: this.backgroundColor,
    };
  }
}

module.exports = Subject;
