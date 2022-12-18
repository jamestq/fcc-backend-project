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
  
  module.exports = {
    convertToUnix: convertToUnix,
    formatDate: formatDate
  }