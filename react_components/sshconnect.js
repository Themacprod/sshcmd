/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent");

module.exports = React.createClass({
    componentWillMount: function() {
    request
        .get("/api/cmd/192.168.1.188")
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
