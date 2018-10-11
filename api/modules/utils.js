var moment = require('moment');
exports.getDispDateByString = (dateStr) => {
      return new moment(dateStr, 'MM-DD-YYYY').format('MM-DD-YYYY');
}

//validate date format -- "mm/dd/yyyy" or "mm-dd-yyyy"
exports.validateDate  = (testdate) => {
    var date_regex = /^(0[1-9]|1[0-2])[\/\-](0[1-9]|1\d|2\d|3[01])[\/\-](19|20)\d{2}$/ ;
    return date_regex.test(testdate);
}