"use strict";

var React = require("react"),
    _ = require("lodash"),
    registerline = require("./registerline");

module.exports = React.createClass({
    render: function() {
        return React.DOM.table(
            {
                className: "table table-hover table-sm table-bordered text-small"
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
            _.map(this.props.data, function(data, index) {
                return React.createElement(registerline, {
                    key: index,
                    offset: data.offset,
                    name: data.name,
                    value: this.props.readData[index],
                    callBack: this.props.callBack
                });
            }.bind(this))
        );
    }
});
