"use strict";

var mongodb = require("mongodb"),
	database = require("./database");
// Should _id: req.user._id

module.exports.getConfig = function(req, res) {
	database.users.findOne({
		_id: new mongodb.ObjectID("532b3d9affed85e92a692432")
	}, function(err, doc) {
		if (err) {
			console.log(err);
			res.sendStatus(404);
		} else {
			res.json(doc.data);
		}
	});
};
