/* global module:true */

"use strict";

var React = require("react"),
    register = require("./register"),
    AdvCecReg = require("../registers/adv7619/Adv7619_CecRegs");

module.exports = React.createClass({
    render: function() {
        return React.createElement(register, {
            data: AdvCecReg
        });
    }
});
