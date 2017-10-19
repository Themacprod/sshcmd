/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    getConsecutiveOffsetChunk: function() {
        var difference = -1,
            temp = [],
            result = [];
        _.forEach(this.props.data, function(data, index) {
            if (difference !== (data.offset - index)) {
                if (difference !== -1) {
                    result.push(temp);
                    temp = [];
                }
                difference = data.offset - index;
            }
            temp.push(data.offset);
        });

        if (temp.length) {
            result.push(temp);
        }

        // From [0,1,2] [4,5] [7] get [0,3] [4,2] [7,1]
        return _.map(result, function(chunk) {
            return {
                startoffset: chunk[0],
                count: chunk.length
            };
        });
    },
    toHexadecimal: function(integer) {
        if (integer < 16) {
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
                    this.props.data.value || "-"
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
