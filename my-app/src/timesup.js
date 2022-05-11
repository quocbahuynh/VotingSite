var dateInPast = function (firstDate, secondDate) {
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return -1;
  }

  return 1;
};

var past = new Date(process.env.REACT_APP_TIMESUP);
var today = new Date();
const diffInMs = dateInPast(past, today);

export default diffInMs;


