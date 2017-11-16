"use strict";

var React = require("react"),
    _ = require("lodash");

var toHex = function(data) {
    if (Number.isInteger(data)) {
        var hexValue = data.toString(16).toUpperCase();
        if (hexValue.length < 2) {
            hexValue = "0" + hexValue;
        }
        return hexValue;
    }
    return "00";
};

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: "registergridlayout"
            },
            _.map(_.chunk(this.props.readData, 10), function(line, key) {
                return React.DOM.div(
                    {
                        className: "text-center",
                        key: key
                    },
                    _.map(line, function(data, index) {
                        return React.DOM.div(
                            {
                                className: "registergrid-item",
                                key: index
                            },
                            toHex(data)
                        );
                    })
                );
            })
        );
    }
});
