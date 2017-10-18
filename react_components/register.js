/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    componentDidMount: function() {
        var prevOffset = -1;
        var startOffset = -1;
        var nbofdata = 0;
        var array = [];
        _.forEach(this.props.data, function(data) {
            if (startOffset === -1) {
                startOffset = data.offset;
            }

            if (prevOffset !== -1) {
                if ((prevOffset + 1) === data.offset) {
                    nbofdata += 1;
                } else {
                    array.push(startOffset);
                    console.log(startOffset + " " + (nbofdata + 1));
                    nbofdata = 0;
                    startOffset = data.offset;
                }
            }

            prevOffset = data.offset;
        });
    },
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
