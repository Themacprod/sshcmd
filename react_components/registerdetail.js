/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash"),
    registerfield = require("./registerfield");

module.exports = React.createClass({
    listOfValue: function(index) {
        if (index >= 0) {
            var tmp = _.map(this.props.detail.data[index].values, function(value, key) {
                return React.DOM.div(
                    {
                        className: "values",
                        key: key
                    },
                    value.value + " : " + value.description
                );
            });

            this.setState({
                values: tmp
            });

            this.setState({
                description: _.map(this.props.detail.data[index].description, function(msg) {
                    return msg;
                })
            });
        } else {
            this.setState({
                values: "No value description",
                description: "No description"
            });
        }
    },
    handleClick: function(bitIndex) {
        this.listOfValue(bitIndex);
	},
    getInitialState: function() {
        return {
            description: "No description",
            values: "No value description"
        };
    },
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
                parent: this.props.detail.data,
                callBack: this.handleClick
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
                    className: "margin-sep"
                },
                this.state.description
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
                    className: "margin-sep"
                },
                this.state.values
            )
        );
    }
});
