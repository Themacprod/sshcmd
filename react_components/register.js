/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash"),
    request = require("superagent"),
    registerlistlayout = require("./registerlistlayout"),
    registergridlayout = require("./registergridlayout"),
    registerdetail = require("./registerdetail"),
    navbar = require("./navbar"),
    dropdown = require("./dropdown");

var layoutTypes = [
    "list",
    "grid"
];

module.exports = React.createClass({
    getConsecutiveOffsetChunk: function() {
        var difference = -1,
            temp = [],
            result = [];
        _.forEach(this.props.data[this.state.dataIndex].offset, function(data, index) {
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
                address: this.props.data[this.state.dataIndex].address,
                offsetsize: this.props.offsetsize,
                startoffset: data.startoffset,
                datacount: data.count
            })
            .end(function(err, res) {
                if (err) {
                    console.log("Read failed!");
                } else {
                    var startIndex = _.findIndex(this.props.data[this.state.dataIndex].offset, function(o) {
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
        request
            .get("/api/ping/" + this.props.ip)
            .end(function(err, res) {
                if (!err) {
                    if (res.body === true) {
                        // Do I2C access, only if source is alive.
                        _.forEach(this.getConsecutiveOffsetChunk(), function(data) {
                            this.readData(data);
                        }.bind(this));
                    }
                }
            }.bind(this));
    },
    getInitialState: function() {
        return {
            readData: _.fill(Array(this.props.data[0].offset.length), "-"),
            detail: this.props.data[0].offset[0],
            value: "0x00",
            layoutType: layoutTypes[0],
            dataIndex: 0
        };
    },
    handleClick: function(offset) {
        var index = _.findIndex(this.props.data[this.state.dataIndex].offset, function(o) {
            return o.offset === offset;
        });

        if (index >= 0) {
            this.setState({
                detail: this.props.data[this.state.dataIndex].offset[index],
                value: this.state.readData[index]
            });
        }
    },
    handleAddressClick: function(index) {
        this.setState({
            dataIndex: index
        });
    },
    handleLayoutClick: function(index) {
        this.setState({
            layoutType: layoutTypes[index]
        });
    },
    getOffsetDropdown: function() {
        var values = _.map(this.props.data, function(data) {
            return "0x" + data.address.toString(16).toUpperCase() +
                " - " + data.description;
        });

        var current = "0x" + this.props.data[this.state.dataIndex].address.toString(16).toUpperCase() +
        " - " + this.props.data[this.state.dataIndex].description;

        return React.createElement(dropdown, {
            id: "offsetDropdown",
            values: values,
            current: current,
            callBack: this.handleAddressClick
        });
    },
    getLayoutDropdown: function() {
        return React.createElement(dropdown, {
            id: "layoutDropdown",
            values: layoutTypes,
            current: this.state.layoutType,
            callBack: this.handleLayoutClick
        });
    },
    render: function() {
        var layout = null;

        switch (this.state.layoutType) {
            case "list":
                layout = React.createElement(registerlistlayout, {
                    data: this.props.data[this.state.dataIndex].offset,
                    readData: this.state.readData,
                    callBack: this.handleClick
                });
                break;

            case "grid":
                layout = React.createElement(registergridlayout, {
                    data: this.props.data[this.state.dataIndex].offset,
                    readData: this.state.readData,
                    callBack: this.handleClick
                });
                break;

            default:
                // Not handled yet.
                if (this.state.layoutType) {
                    console.log(this.state.layoutType);
                }

                break;
        }

        return React.DOM.div(
            {
                className: "registercontainer"
            },
            React.createElement(navbar, {
                data: [
                    this.getOffsetDropdown(),
                    this.getLayoutDropdown()
                ]
            }),
            React.DOM.div(
                {
                    className: "registerlist"
                },
                layout
            ),
            React.createElement(registerdetail, {
                detail: this.state.detail,
                value: this.state.value
            })
        );
    }
});
