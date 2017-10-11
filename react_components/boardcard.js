"use strict";

var React = require("react");

module.exports = React.createClass({
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
                    this.props.cardtitle
                ),
                React.DOM.p(
                    {
                        className: "card-text"
                    },
                    this.props.cardtext
                )
            )
        );
    }
});
