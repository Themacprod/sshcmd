/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    toHexadecimal: function(integer) {
        if (integer < 10) {
            return "0x0" + integer.toString(16).toUpperCase();
        }

        return "0x" + integer.toString(16).toUpperCase();
    },
    createLine: function(data) {
        return React.DOM.tbody(
            {
                key: data.offset
            },
            React.DOM.tr(
                null,
                React.DOM.th(
                    {
                        className: "offset",
                        scope: "row"
                    },
                    this.toHexadecimal(data.offset)
                ),
                React.DOM.td(
                    null,
                    data.name
                ),
                React.DOM.td(
                    {
                        className: "value"
                    },
                    "0x00"
                )
            )
        );
    },
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.div(
                {
                    className: "registerlist"
                },
                React.DOM.table(
                    {
                        className: "table table-sm table-bordered"
                    },
                    React.DOM.thead(
                        null,
                        React.DOM.tr(
                            {
                                className: "table-dark"
                            },
                            React.DOM.th(
                                null,
                                "Offset"
                            ),
                            React.DOM.th(
                                null,
                                "Name"
                            ),
                            React.DOM.th(
                                null,
                                "Value"
                            )
                        )
                    ),
                    _.map(this.props.data, function(data) {
                        return this.createLine(data);
                    }.bind(this))
                )
            )
        );
    }
});
