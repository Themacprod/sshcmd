/* global module:true */

"use strict";

var React = require("react"),
    registerfield = require("./registerfield");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: "registerdetail"
            },
            React.DOM.div(
                {
                    className: "title"
                },
                React.DOM.div(
                    {
                        className: "registername text-bold"
                    },
                    "Register - " + (this.props.detail.name || "REGISTER_NAME")
                ),
                React.DOM.div(
                    {
                        className: "resetvalue text-italic text-right"
                    },
                    "(reset value = " + (this.props.detail.resetvalue || "0x00") + ")"
                )
            ),
            React.DOM.hr(null),
            React.createElement(registerfield, {
                parent: this.props
            }),
            React.DOM.div(
                {
                    className: "text-bold"
                },
                "Description"
            ),
            React.DOM.hr(null),
            React.DOM.div(
                {
                    className: "field-description"
                },
                this.props.fielddescription || " No description"
            ),
            React.DOM.div(
                {
                    className: "text-bold"
                },
                "List of value"
            ),
            React.DOM.hr(null),
            React.DOM.div(
                {
                    className: "field-values"
                },
                this.props.fielddvalue || " No value description"
            )
        );
    }
});
