"use strict";

var mongoClient = require("mongodb").MongoClient;

module.exports.connect = function() {
	var promise = mongoClient.connect("mongodb://localhost:27017/sshcmd");

	return promise.then(function(database) {
		module.exports.instance = database;
		module.exports.users = database.collection("users");
	});
};
