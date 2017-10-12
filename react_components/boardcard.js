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
    componentDidMount: function() {
        setInterval(this.checkConnection, 750);
    },
    getInitialState: function() {
        return {
            statelayout: React.DOM.i({
                className: "fa fa-refresh fa-spin"
            })
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
                        this.props.boardName
                    ),
                    React.DOM.p(
                        {
                            className: "card-text"
                        },
                        this.props.boardIp
                    ),
                    this.state.statelayout
                )
            )
        );
    }
});
