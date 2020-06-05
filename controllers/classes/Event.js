class Event {
  constructor({
    title = "",
    start = "",
    end = "",
    department = "",
    note = "",
    backgroundColor = "",
  }) {
    this._title = title;
    this._start = start;
    this._end = end;
    this._department = department;
    this._note = note;
    this._backgroundColor = backgroundColor;
  }

  get title() {
    return this._title;
  }
  get start() {
    return this._start;
  }
  get end() {
    return this._end;
  }
  get department() {
    return this._department;
  }
  get note() {
    return this._note;
  }
  get backgroundColor() {
    return this._backgroundColor;
  }

  post() {
    return [
      this.title,
      new Date(this.start),
      new Date(this.end),
      this.department,
      this.note,
      this.backgroundColor,
      null,
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
