var moment = require('moment');

const getDisplayDate = (momentObj) => {
	return momentObj.format('MM-DD-YYYY');
}

const getDispDateByString = (dateStr) => {
	return getDisplayDate(new moment(dateStr, 'MM-DD-YYYY'));
}

export {
	getDisplayDate,
	getDispDateByString
}