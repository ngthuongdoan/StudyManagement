class Event {
  constructor({
    eventName,
    eventStartTime,
    eventEndTime,
    eventPlace,
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
