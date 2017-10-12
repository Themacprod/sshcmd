"use strict";

var React = require("react"),
    request = require("superagent");

module.exports = React.createClass({
    checkConnection: function() {
        request
            .get("/api/ping/" + this.props.boardIp)
            .end(function(err, res) {
                if (err) {
                    // Stop ping loop process of server does not respond anymore.
                    clearInterval(this.checkConnection);
                    console.log(err);
                } else {
                    var state = null;
                    if (res.body === true) {
                        state = React.DOM.i({
                            className: "fa fa-check"
                        });
                    } else {
                        state = React.DOM.i({
                            className: "fa fa-times"
                        });
                    }

                    this.setState({
                        statelayout: state
                    });
                }
            }.bind(this));
    },
    getBoardInfo: function() {
        console.log("/api/board/" + this.props.boardIp);
        request
            .get("/api/board/" + this.props.boardIp)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    this.setState({
                        boardInfo: res.body
                    });
                }
            }.bind(this));
    },
    componentDidMount: function() {
        this.getBoardInfo();
        setInterval(this.checkConnection, 750);
    },
    getInitialState: function() {
        return {
            statelayout: React.DOM.i({
                className: "fa fa-refresh fa-spin"
            }),
            boardInfo: null
        };
    },
    render: function() {
        var boardName = (this.state.boardInfo === null) ? null : this.state.boardInfo.ProductName;
        var serialNumber = (this.state.boardInfo === null) ? null : this.state.boardInfo.SerialNumber;
        var pcbNumber = (this.state.boardInfo === null) ? null : this.state.boardInfo.PcbNumber;

        return React.DOM.div(
            {
                className: "grid-item card",
                key: this.props.boardIp
            },
            React.DOM.a(
                {
                    className: "nav-link",
                    href: this.props.boardIp + "/"
                },
                React.DOM.div(
                    {
                        className: "card-body"
                    },
                    React.DOM.h4(
                        {
                            className: "card-title"
                        },
                        boardName
                    ),
                    React.DOM.h6(
                        {
                            className: "card-subtitle"
                        },
                        this.props.boardIp
                    ),
                    React.DOM.p(
                        {
                            className: "card-text"
                        },
                        "Serial : " + serialNumber + " (PCB : " + pcbNumber + ")"
                    ),
                    this.state.statelayout
                )
            )
        );
    }
});
