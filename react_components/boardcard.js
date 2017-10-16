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

                    // Get board info only when going from dead to alive connection.
                    if ((this.state.statelayout !== "fa fa-check") && (state === "fa fa-check")) {
                        this.checkBoardInfo = true;
                    }

                    this.setState({
                        statelayout: state
                    });
                }
            }.bind(this));

        if (this.checkBoardInfo === true) {
            this.getBoardInfo();
            this.checkBoardInfo = false;
        }
    },
    getBoardInfo: function() {
        request
            .get("/api/board/" + this.props.boardIp)
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    this.setState({
                        productName: res.body.ProductName,
                        serialNumber: res.body.SerialNumber,
                        pcbNumber: res.body.PcbNumber
                    });
                }
            }.bind(this));
    },
    componentDidMount: function() {
        this.checkBoardInfo = false;
        this.myInterval = setInterval(this.checkConnection, 2000);
    },
    getInitialState: function() {
        return {
            statelayout: "fa fa-refresh fa-spin",
            productName: "Unknown",
            serialNumber: "Unknown",
            pcbNumber: "Unknown"
        };
    },
    render: function() {
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
                        this.state.productName
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
                        "Serial : " + this.state.serialNumber + " (PCB : " + this.state.pcbNumber + ")"
                    ),
                    React.DOM.i({
                        className: this.state.statelayout
                    })
                )
            )
        );
    }
});
