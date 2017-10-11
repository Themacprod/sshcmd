"use strict";

var Config = require("./config");

module.exports.getConfig = function(req, res) {
	res.json(Config);
};
