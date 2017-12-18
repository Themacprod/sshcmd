"use strict";

var React = require("react"),
    _ = require("lodash");

var toHex = function(data) {
    if (data === "-") {
        return data;
    }

    if (typeof data !== "undefined") {
        if (Number.isInteger(data.substring(2))) {
            return data.substring(2);
        }
    }

    return "-";
};

module.exports = React.createClass({
    handleClick: function(offset) {
        this.props.callBack(offset);
    },
    getTooltipsData: function(columnIdx, lineIdx) {
        var offset = columnIdx + (lineIdx * 16);

        var startIndex = _.findIndex(this.props.data, function(o) {
            return o.offset === offset;
        });

        var description = "";

        if (startIndex >= 0) {
            description = " - " + this.props.data[startIndex].name;
        }

        var data = offset.toString(16).toUpperCase();

        if (data.length === 1) {
            data = "0" + data;
        }

        return "0x" + data + description;
    },
    render: function() {
        var max = _.maxBy(this.props.data, function(data) {
            return data.offset;
        });

        var gridData = _.fill(Array(max.offset + 1), "-");

        _.forEach(this.props.data, function(data, index) {
            gridData[data.offset] = this.props.readData[index];
        }.bind(this));

        var header = [];

        for (var i = 0; i < 16; i += 1) {
            header.push(React.DOM.div(
                {
                    className: "registergrid-item text-bold",
                    key: i
                },
                "0" + i.toString(16).toUpperCase()
            ));
        }
        return React.DOM.div(
            {
                className: "registergridlayout"
            },
            React.DOM.div({
                    className: "text-center",
                    key: 0
                }, header),
            _.map(_.chunk(gridData, 16), function(line, lineIdx) {
                return React.DOM.div(
                    {
                        className: "text-center",
                        key: lineIdx
                    },
                    _.map(line, function(data, columnIdx) {
                        return React.DOM.div(
                            {
                                "className": "registergrid-item",
                                "key": columnIdx,
                                "onClick": this.handleClick.bind(this, columnIdx + lineIdx),
                                "data-toggle": "tooltip",
                                "data-placement": "top",
                                "title": this.getTooltipsData(columnIdx, lineIdx)
                            },
                            toHex(data)
                        );
                    }.bind(this))
                );
            }.bind(this))
        );
    }
});
