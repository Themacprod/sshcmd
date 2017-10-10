/* global module:true */

"use strict";

var React = require("react"),
    sshconnect = require("./sshconnect");

module.exports = React.createClass({
    componentDidMount: function() {
        global.jQuery = require("jquery");
        require("../node_modules/bootstrap/dist/js/bootstrap");
    },
    render: function() {
        return React.DOM.div(
            {
                className: "app"
            },
            React.createElement(sshconnect)
        );
    }
});
