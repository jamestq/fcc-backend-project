const convertToUnix = (date) => {
    return date.getTime();
  }
  
const formatDate = (dateString) => {
  if (dateString === undefined) {
    let date = new Date();
    return date;
  } else if (dateString.match(/^[0-9]+$/) != null) {
    dateString = parseInt(dateString);
  }
  let date = new Date(dateString);
  return isNaN(Date.parse(date)) ? null : date;
}

const filterEx = (exercise, from, to, reqId) => {
  let idMatch = exercise._id === reqId;
  if (from && to) {
    let fromDate = new Date(from);
    let toDate = new Date(to);
    let exerciseDate = new Date(exercise.date);
    let dateRange = exerciseDate.getTime() >= fromDate.getTime() && exerciseDate.getTime() <= toDate.getTime()
    return dateRange && idMatch;
  }
  return idMatch;
}
  
module.exports = {
  convertToUnix: convertToUnix,
  formatDate: formatDate,
  filterEx: filterEx
}