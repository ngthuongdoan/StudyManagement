class Event {
  constructor({
    eventName="",
    eventStartTime="",
    eventEndTime="",
    eventPlace="",
    eventNote = "",
    eventColor = "",
  }) {
    this.title = eventName;
    this.start = eventStartTime;
    this.end = eventEndTime;
    this.department = eventPlace;
    this.note = eventNote;
    this.backgroundColor = eventColor;
  }

  get eventName (){
    return this.title;
  }

  post() {
    return [
      this.title,
      new Date(this.start),
      new Date (this.end),
      this.department,
      this.note,
      this.backgroundColor,
      null
    ];
  }

  send() {
    return {
      title: this.title,
      start: this.start,
      end: this.end,
      extendedProps: {
        department: this.department,
      },
      description: this.note,
      backgroundColor: this.backgroundColor,
    };
  }
}

module.exports = Event;
