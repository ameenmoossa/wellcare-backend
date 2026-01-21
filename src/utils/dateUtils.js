// backend/utils/dateUtils.js

exports.getDayNumber = (startDate) => {
  const start = new Date(startDate);
  const today = new Date();

  // remove time
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff =
    Math.floor((today - start) / (1000 * 60 * 60 * 24)) + 1;

  return Math.min(Math.max(diff, 1), 90);
};






// backend/utils/constants.js

