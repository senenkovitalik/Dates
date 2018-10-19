function Calendar(now) {
  this.now = new Date(now);

  this.currentMonth = {
    month:  now.getUTCMonth(),
    days:   days[now.getUTCMonth()],
    weeks:  computeWeeks(now)
  };

  this.currentWeek = null;  // 0, 1, 2, ...

  const nextMonth = new Date();
  nextMonth.setMonth(this.currentMonth.month + 1);
  nextMonth.setDate(1);

  this.nextMonth = {
    month:  now.getUTCMonth() + 1,
    days:   days[now.getUTCMonth() + 1],
    weeks:  computeWeeks(nextMonth)
  };

  this.today        = null;
  this.tomorrow     = null;
  this.end_of_week  = null;
  this.next_week    = null;
  this.end_of_month = null;
  this.next_month   = null;
};

Calendar.prototype.computePeriods = function() {
  this.getToday().print();
  this.getTomorrow().print();
  this.getEndOfWeek().print();
  this.getNextWeek().print();
  this.getEndOfMonth().print();
  this.getNextMonth().print();
};

Calendar.prototype.getToday = function() {
  this.today = new Period(TODAY, this.now);
  this.today.setStartEndTime();

  return this.today;
}

Calendar.prototype.getTomorrow = function() {
  this.tomorrow = new Period(TOMORROW, this.now);
  const nextDay = this.today.start.getDate() + 1;

  this.tomorrow.start.setDate(nextDay);
  this.tomorrow.end.setDate(nextDay);

  this.tomorrow.setStartEndTime();

  return this.tomorrow;
}

Calendar.prototype.getEndOfWeek = function() {
  this.end_of_week = new Period(END_OF_WEEK, this.now);

  // find current week
  for (let i in this.currentMonth.weeks) {
    const currentWeek = this.currentMonth.weeks[i];
    const tomorrow = this.tomorrow.start.getDate();

    if (tomorrow >= currentWeek.start && tomorrow <= currentWeek.end) {
      // i is a current week
      this.currentWeek = Object.assign({}, { index: i }, this.currentMonth.weeks[i]);
      break;
    }
  }

  // Are tomorrow end of week?
  if (this.tomorrow.start.getDate() === this.currentWeek.end) {
    // end of week
    this.end_of_week.start = null;
    this.end_of_week.end = null;
  } else {
    // not end of week
    const nextDay = this.tomorrow.start.getDate() + 1;
    this.end_of_week.start.setDate(nextDay);
    this.end_of_week.end.setDate(this.currentWeek.end);
    this.end_of_week.setStartEndTime();
  }

  return this.end_of_week;
}

Calendar.prototype.getNextWeek = function() {
  this.next_week = new Period(NEXT_WEEK, this.now);
  
  const prop = parseInt(this.currentWeek.index) + 1;

  if (this.currentMonth.weeks[prop]) {
    // we have next week!!!
    this.next_week.start.setDate(this.currentMonth.weeks[prop].start);
    this.next_week.end.setDate(this.currentMonth.weeks[prop].end);
    this.next_week.setStartEndTime();
  } else {
    this.next_week.start = null;
    this.next_week.end = null;
  }

  return this.next_week;
}

Calendar.prototype.getEndOfMonth = function() {
  this.end_of_month = new Period(END_OF_MONTH, this.now);

  let i = parseInt(this.currentWeek.index) + 2;
  let first = null;
  let last = null;

  while(this.currentMonth.weeks[i]) {
    if (!first) {
      first = this.currentMonth.weeks[i];
    }
    last = this.currentMonth.weeks[i];
    i++;
  }

  if (first === null) {
    this.end_of_month.start = null;
    this.end_of_month.end = null;
  } else {
    this.end_of_month.start.setDate(first.start);
    this.end_of_month.end.setDate(last.end);
    this.end_of_month.setStartEndTime();
  }

  return this.end_of_month;
}

Calendar.prototype.getNextMonth = function() {
  this.next_month = new Period(NEXT_MONTH, this.now);

  this.next_month.start.setMonth(this.nextMonth.month);
  this.next_month.start.setDate(1);

  this.next_month.end.setMonth(this.nextMonth.month);
  this.next_month.end.setDate(this.nextMonth.days);

  this.next_month.setStartEndTime();

  return this.next_month;
}
