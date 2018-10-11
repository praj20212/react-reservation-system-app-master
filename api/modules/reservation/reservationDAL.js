var database = require("../db");
const ObjectID = require('mongodb').ObjectID;

var getReservation = (query, cb) => {
	database.getDB((err, db) => {
		db.collection('reservations').findOne(query, (err, item) => {
	        if (err) {
	           cb('An error has occurred');
	        } else {
	          cb(null, item)
	        }
      	});
	})
}

var getReservations = (query, options, cb) => {
	database.getDB((err, db) => {
		db.collection('reservations').find(query, options).toArray((err, items) => {
	        if (err) {
	           cb('An error has occurred');
	        } else {
	          cb(null, items)
	        }
      	});
	})
}

var saveReservation = (data, cb) => {
	database.getDB((err, db) => {
		db.collection('reservations').insert(data, (err, res) => {
	        if (err) {
	           cb('An error has occurred');
	        } else {
	          cb(null, res.ops[0]);
	        }
      	});
	})
}

var updateReservation = (query ,data, cb) => {
	database.getDB((err, db) => {
		db.collection('reservations').update(query,  data, (err, result) => {
	        if (err) {
	           cb('An error has occurred');
	        } else {
	          cb(null, result);
	        }
      	});
	})
}


exports.getReservation = getReservation;
exports.saveReservation = saveReservation;
exports.updateReservation = updateReservation;
exports.getReservations = getReservations;