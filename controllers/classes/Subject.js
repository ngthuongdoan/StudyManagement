class Subject {
  constructor({
    idSubject,
    subjectName,
    teacherEmail,
    subjectRoom = "",
    subjectWeek,
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
    this.target = subjectTarget;
    this.note = subjectNote;
    this.teacherEmail = teacherEmail;
    this.backgroundColor = subjectColor;
  }

  send() {
    return {
      id : this.id,
      title : this.title,
      extendedPros:{
        room : this.room,
        week : this.week,
        target : this.target,
        note : this.note,
        teacherEmail : this.teacherEmail,
      },
      rrule: {
        freq: "weekly",
        wkst:this.start,
        byweekno:[1,2,3,6,7,8,9,10,11,12,13,14,15,16,17],
        dtstart: this.start,
        until: this.end
      },
      backgroundColor : this.backgroundColor,
    };
  }
}

module.exports = Subject;
