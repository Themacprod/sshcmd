"use strict";

var React = require("react"),
    _ = require("lodash"),
    boardcard = require("./boardcard");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            {
                className: "boardgroup"
            },
                React.DOM.div(
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
            )
        );
    }
});
