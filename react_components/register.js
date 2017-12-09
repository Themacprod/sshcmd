/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash"),
    request = require("superagent"),
    registerlistlayout = require("./registerlistlayout"),
    registergridlayout = require("./registergridlayout"),
    registerdetail = require("./registerdetail");

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
                address: this.props.address,
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
        _.forEach(this.getConsecutiveOffsetChunk(), function(data) {
            this.readData(data);
        }.bind(this));
    },
    getInitialState: function() {
        return {
            readData: _.fill(Array(this.props.data[0].offset.length), "-"),
            detail: this.props.data[0].offset[0],
            value: "0x00",
            layoutType: "grid",
            showDropdown: false,
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
    changeDropDown: function() {
        this.setState({
            showDropdown: !this.state.showDropdown
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

        var showDropdown = this.state.showDropdown ? " show" : "";

        return React.DOM.div(
            {
                className: "registercontainer"
            },
            React.DOM.div(
                {
                    className: "dropdown" + showDropdown,
                    onClick: this.changeDropDown
                },
                React.DOM.button(
                    {
                        "className": "btn btn-secondary dropdown-toggle",
                        "type": "button",
                        "id": "dropdownMenuButton",
                        "data-toggle": "dropdown",
                        "aria-haspopup": "true",
                        "aria-expanded": this.state.showDropdown
                    },
                    "0x" + this.props.data[this.state.dataIndex].address.toString(16).toUpperCase() +
                    " - " + this.props.data[this.state.dataIndex].description
                ),
                React.DOM.div(
                    {
                        "className": "dropdown-menu" + showDropdown,
                        "aria-labelledby": "dropdownMenuButton"
                    },
                    _.map(this.props.data, function(data, index) {
                        return React.DOM.a(
                            {
                                className: "dropdown-item",
                                key: index,
                                onClick: this.handleAddressClick.bind(this, index)
                            },
                            "0x" + data.address.toString(16).toUpperCase() +
                            " - " + data.description
                        );
                    }.bind(this))
                )
            ),
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
