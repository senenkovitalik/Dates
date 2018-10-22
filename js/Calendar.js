function Calendar(now) {
  this.now = new Date(now);

  this.monthes = computeMonthes(now);
  this.currentMonth = 0;

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

  // tomorrow may be at new month 
  this.computeCurrentMonth(this.tomorrow.start);
  this.computeCurrentWeek(this.tomorrow.start);

  return this.tomorrow;
}

Calendar.prototype.getEndOfWeek = function() {
  this.end_of_week = new Period(END_OF_WEEK, this.now);

  const month = this.monthes[this.currentMonth]; 
  const week = month.week;
  const currentWeek = month.weeks[week];

  // Are tomorrow end of week?
  if (this.tomorrow.start.getDate() === currentWeek.end) {
    // end of week
    this.end_of_week.start = null;
    this.end_of_week.end = null;
  } else {
    // not end of week
    const nextDay = this.tomorrow.start.getDate() + 1;
    this.end_of_week.start.setDate(nextDay);
    this.end_of_week.end.setDate(currentWeek.end);
    this.end_of_week.setStartEndTime();
  }

  return this.end_of_week;
}

Calendar.prototype.getNextWeek = function() {
  this.next_week = new Period(NEXT_WEEK, this.now);
  
  // Need to do something with it
  const month = this.monthes[this.currentMonth]; 
  const week = month.week;
  const currentWeek = month.weeks[week];

  const prop = parseInt(week) + 1;

  if (month.weeks[prop]) {
    // we have next week!!!
    this.next_week.start.setDate(month.weeks[prop].start);
    this.next_week.end.setDate(month.weeks[prop].end);
    this.next_week.setStartEndTime();
  } else {
    this.next_week.start = null;
    this.next_week.end = null;
  }

  return this.next_week;
}

Calendar.prototype.getEndOfMonth = function() {
  this.end_of_month = new Period(END_OF_MONTH, this.now);

  // Need to do something with it
  const month = this.monthes[this.currentMonth]; 
  const week = month.week;
  const currentWeek = month.weeks[week];

  let i = parseInt(week) + 2;
  let first = null;
  let last = null;

  while(month.weeks[i]) {
    if (!first) {
      first = month.weeks[i];
    }
    last = month.weeks[i];
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

  const { month: nextMonthNumber, days } = this.monthes[parseInt(this.currentMonth) + 1];

  console.log();

  this.next_month.start.setMonth(nextMonthNumber);
  this.next_month.start.setDate(1);

  this.next_month.end.setMonth(nextMonthNumber);
  this.next_month.end.setDate(days);

  this.next_month.setStartEndTime();

  return this.next_month;
}

Calendar.prototype.computeCurrentWeek = function(date) {
  const d = new Date(date);

  const weeks = this.monthes[this.currentMonth].weeks;

  for(let i in weeks) {
    if (d.getDate() >= weeks[i].start && d.getDate() <= weeks[i].end) {
      Object.assign(this.monthes[this.currentMonth], {
        week: i 
      });
    }
  }
}

Calendar.prototype.computeCurrentMonth = function(date) {
  const month = date.getMonth();
  
  for(let i in this.monthes) {
    if (this.monthes[i].month === month) {
      this.currentMonth = i;
    }
  }
}
