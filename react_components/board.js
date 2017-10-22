/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent"),
    boardsystem = require("./boardsystem");

module.exports = React.createClass({
    checkConnection: function() {
        request
            .get("/api/ping/" + this.props.params.ip)
            .end(function(err, res) {
                if (err) {
                    // Stop ping loop process of server does not respond anymore.
                    clearInterval(this.myInterval);
                } else {
                    var alertState = "alert-danger";
                    if (res.body === true) {
                        alertState = "alert-success";
                    }

                    this.setState({
                        alertState: alertState
                    });
                }
            }.bind(this));
    },
    componentDidMount: function() {
        this.myInterval = setInterval(this.checkConnection, 2000);
    },
    getInitialState: function() {
        return {
            alertState: "alert-light"
        };
    },
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.div({
                className: "alert " + this.state.alertState,
                role: "alert"
            }, this.props.params.ip),
            React.createElement(boardsystem, {
                title: "Input #1",
                subtitle: "ADV1"
            }),
            React.createElement(boardsystem, {
                title: "Input #2",
                subtitle: "ADV2"
            }),
            React.createElement(boardsystem, {
                title: "Input #3",
                subtitle: "ADV3"
            }),
            React.createElement(boardsystem, {
                title: "Input #4",
                subtitle: "ADV4"
            })
        );
    }
});
