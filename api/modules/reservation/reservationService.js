var reservationDAL = require("./reservationDAL");
const ObjectID = require('mongodb').ObjectID;
const utils = require("../utils");

var getReservationDetail = (id, cb) => {
	const query = { '_id': new ObjectID(id)};
	reservationDAL.getReservation(query, (err, item)=>{
		if(err) cb(err);
		else{
			let count = item ? 1 : 0;
			cb(null, {
	            'count': count,
	            'data': item
	        })
		}
	});
}

var getReservations = (options, cb) => {
	if(options.hasOwnProperty('name')) {
  		options.name = {$regex : ".*" + options.name +".*"};
  	}
    if(options.hasOwnProperty('hotelName')) {
  		options.hotelName = {$regex : ".*" + options.hotelName +".*"};
  	}
    if(options.hasOwnProperty('arrivalDate')) {
    	if(!utils.validateDate(options.arrivalDate)){
    		cb("Invalid arrivalDate");
    		return;
    	}
  		options.arrivalDate = utils.getDispDateByString(options.arrivalDate);
  	}
  	if (options.hasOwnProperty('departureDate')) {
  		if(!utils.validateDate(options.departureDate)){
    		cb("Invalid departureDate");
    		return;
    	}
  		options.departureDate = utils.getDispDateByString(options.departureDate);
  	}

	var skip = size = undefined; 
  	if(options.page && options.size){
       page = parseInt(options.page),
           size = parseInt(options.size),
           skip = page > 1 ? ((page - 1) * size) : 0;
    }

    delete options.page;
    delete options.size;

  	reservationDAL.getReservations(options, {}, (err, items)=>{
  		if(err) cb(err);
  		else{
  			var count = items.length;
  			reservationDAL.getReservations(options, {skip: skip, limit: size}, (err, items)=>{
  				if(err) cb(err);
				else{
					cb(null, {
			            'count': count,
			            'data': items
			        })
				}
  			})
  		}
  	})
}

var saveReservation = (data, cb) =>{
	reservationDAL.saveReservation(data, cb)
}

var updateReservation = (id, data, cb) =>{
	const query = { '_id': new ObjectID(id)};
	reservationDAL.updateReservation(query, data, cb)
}

exports.getReservationDetail = getReservationDetail;
exports.saveReservation = saveReservation;
exports.updateReservation = updateReservation;
exports.getReservations = getReservations;