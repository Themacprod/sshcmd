/* global module:true */

"use strict";

var React = require("react"),
    sshconnect = require("./sshconnect");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div({
                className: "app"
            },
            React.createElement(sshconnect)
        );
    }
});
