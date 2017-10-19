/* global module:true */

"use strict";

var React = require("react"),
    register = require("./register"),
    RegsIo = require("../registers/adv7619/RegsIo");

module.exports = React.createClass({
    render: function() {
        return React.createElement(register, {
            data: RegsIo,
            ip: this.props.params.ip,
            address: "0x98",
            offsetsize: 8,
            bus: 3
        });
    }
});
