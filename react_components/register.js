/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash"),
    request = require("superagent"),
    registerline = require("./registerline"),
    registerdetail = require("./registerdetail");

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
    readData: function(data) {
        request
            .post("/api/i2cread/")
            .send({
                ip: this.props.ip,
                cmd: "I2cRead",
                bus: this.props.bus,
                address: this.props.address,
                offsetsize: this.props.offsetsize,
                startoffset: data.startoffset,
                datacount: data.count
            })
            .end(function(err, res) {
                if (err) {
                    console.log("Read failed!");
                } else {
                    var startIndex = _.findIndex(this.props.data, function(o) {
                        return o.offset === data.startoffset;
                    });

                    for (var i = 0; i < data.count; i += 1) {
                        this.state.readData[startIndex + i] = res.body.data[i];
                    }

                    this.forceUpdate();
                }
            }.bind(this));
    },
    componentDidMount: function() {
        _.forEach(this.getConsecutiveOffsetChunk(), function(data) {
            this.readData(data);
        }.bind(this));
    },
    getInitialState: function() {
        return {
            readData: _.fill(Array(this.props.data.length), "-"),
            detail: "",
            value: "0x00"
        };
    },
    handleClick: function(offset) {
        var index = _.findIndex(this.props.data, function(o) {
            return o.offset === offset;
        });

        if (index >= 0) {
            this.setState({
                detail: this.props.data[index],
                value: this.state.readData[index]
            });
        }
	},
    render: function() {
        return React.DOM.div(
            {
                className: "registercontainer"
            },
            React.DOM.div(
                {
                    className: "registerlist"
                },
                React.DOM.table(
                    {
                        className: "table table-hover table-sm table-bordered"
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
                            value: this.state.readData[index],
                            callBack: this.handleClick
                        });
                    }.bind(this))
                )
            ),
            React.createElement(registerdetail, {
                detail: this.state.detail,
                value: this.state.value
            })
        );
    }
});
