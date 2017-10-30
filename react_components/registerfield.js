/* global module:true */

"use strict";

var React = require("react");

module.exports = React.createClass({
    render: function() {
        var data = [];

        for (var i = 7; i >= 0; i -= 1) {
            data.push(React.DOM.div(
                {
                    className: "field-detail-column",
                    key: i
                }, React.DOM.div({
                    className: "field-detail-bit-index text-center text-bold"
                }, i),
            React.DOM.div({
                className: "field-detail-bit-detail"
            }, "Test definition #" + i)
        ));
        }

        return React.DOM.div(
            {
                className: "text-center"
            },
            data
        );
    }
});
