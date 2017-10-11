"use strict";

var React = require("react");

module.exports = React.createClass({
    ping: function(ip) {
        if (!this.inUse) {
            this.inUse = true;
            var that = this;
            this.img = new Image();
            this.img.src = "http://" + ip;

            setTimeout(function() {
                if (that.inUse) {
                    that.inUse = false;
                    that.setState({
                        statelayout: React.DOM.i({
                            className: "fa fa-times"
                        })
                    });
                }
            }, 100);

            this.img.onload = function() {
                that.inUse = false;
                that.setState({
                    statelayout: React.DOM.i({
                        className: "fa fa-check"
                    })
                });
            };

            this.img.onerror = function() {
                if (that.inUse) {
                    that.inUse = false;
                    that.setState({
                        statelayout: React.DOM.i({
                            className: "fa fa-check"
                        })
                    });
                }
            };
        }
    },
    componentDidMount: function() {
        this.ping(this.props.boardIp);
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
                className: "card",
                style: {
                    width: "20rem"
                }
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
        );
    }
});
