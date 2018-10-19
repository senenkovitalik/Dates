const TODAY = "TODAY";
const TOMORROW = "TOMORROW";
const END_OF_WEEK = "END_OF_WEEK";
const NEXT_WEEK = "NEXT_WEEK";
const END_OF_MONTH = "END_OF_MONTH";
const NEXT_MONTH = "NEXT_MONTH";

const days = {
  0: 31,
  1: new Date().getUTCFullYear() % 4 ? 29 : 28,
  2: 31,
  3: 30,
  4: 31,
  5: 30,
  6: 31,
  7: 31,
  8: 30,
  9: 31,
  10: 30,
  11: 31
};