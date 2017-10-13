"use strict";

var React = require("react"),
    _ = require("lodash"),
    boardcard = require("./boardcard");

module.exports = React.createClass({
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
        return React.DOM.div(
            {
                className: "card"
            },
            React.DOM.div(
                {
                    className: "card-body"
                },
                React.DOM.h4(
                    {
                        className: "card-title"
                    },
                    this.props.data.name
                ),
                _.map(this.props.data.ip, function(ip, index) {
                    return React.createElement(boardcard, {
                        boardIp: ip,
                        key: index
                    });
                })
            )
        );
    }
});
