const MongoClient = require('mongodb').MongoClient;
const db  = require('../DbConstants');

var DB = null;

var getDB = function(cb){
	if(DB){
		return cb(null, DB);
	}else{
		MongoClient.connect(db.url, (err, database) => {
			if (err) cb(err);
			else{
				DB = database;
				cb(null, DB);
			}
		});
	}
}

exports.getDB = getDB;
