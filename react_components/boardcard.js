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
                    clearInterval(this.myInterval);
                } else {
                    var state = null;
                    if (res.body === true) {
                        state = "fa fa-check";
                    } else {
                        state = "fa fa-times";
                    }

                    this.setState({
                        statelayout: state
                    });
                }
            }.bind(this));
    },
    getBoardInfo: function() {
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
        this.myInterval = setInterval(this.checkConnection, 2000);
    },
    getInitialState: function() {
        return {
            statelayout: "fa fa-refresh fa-spin",
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
                    React.DOM.i({
                        className: this.state.statelayout
                    })
                )
            )
        );
    }
});
