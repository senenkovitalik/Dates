function convert(day) {
  const mapping = {
    0: 6,
    1: 0,
    2: 1,
    3: 2,
    4: 3,
    5: 4,
    6: 5
  };

  return mapping[day];
}

function computeWeeks(now) {
  const weeks = {};
  const n = new Date(now);
  let end = false;
  let i = 0;

  while (!end) {
    const date = n.getUTCDate();
    const month = n.getUTCMonth();
    const day = n.getUTCDay();

    if (date < days[month]) {
      let delta = 6 - convert(day);
      
      if (date + delta > days[month]) {
        delta = days[month] - date;
        end = true;
      }

      weeks[i] = { start: date, end: date + delta };
      n.setUTCDate(date + delta + 1);
      i++;
    } else {
      weeks[i] = { start: date, end: date };
      end = true;
    }
  }

  return weeks;
}
