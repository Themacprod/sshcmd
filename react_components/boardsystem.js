/* global module:true */

"use strict";

var React = require("react");

module.exports = React.createClass({
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.div(
                {
                    className: "boardsystem card"
                },
                React.DOM.a(
                    {
                        className: "nav-link",
                        href: this.props.link + "/"
                    },
                    React.DOM.div(
                        {
                            className: "card-body"
                        },
                        React.DOM.h5(
                            {
                                className: "card-title"
                            },
                            this.props.title
                        ),
                        React.DOM.h6(
                            {
                                className: "card-subtitle"
                            },
                            this.props.deviceName
                        )
                    )
                )
            ),
            React.DOM.div(
                {
                    className: "boardsystem-sep"
                },
                ""
            )
        );
    }
});
