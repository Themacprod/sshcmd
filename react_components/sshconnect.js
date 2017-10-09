/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent");

module.exports = React.createClass({
    componentWillMount: function() {
    request
        .post("/api/cmd")
        .send({
            ip: "192.168.1.188",
            port: "22",
            username: "pi",
            password: "raspberry"
        })
        .end(function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res.body)
            }
        }.bind(this));
},
    render: function() {
        return React.DOM.div(
            null,
            "test"
        );
    }
});
