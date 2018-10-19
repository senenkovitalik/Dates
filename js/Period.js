function Period(name, date) {
  this.name = name;
  this.start = new Date(date);
  this.end = new Date(date);
}

Period.prototype.setStartEndTime = function() {
  this.start.setHours(0);
  this.start.setMinutes(0);
  this.start.setSeconds(0);
  this.end.setHours(23);
  this.end.setMinutes(59);
  this.end.setSeconds(59);

  return this;
}

Period.prototype.print = function() {
  console.log(this.name);
  console.log(this.start instanceof Date ? this.start.toLocaleString() : null);
  console.log(this.start instanceof Date ? this.end.toLocaleString() : null);
  console.log("");
}
