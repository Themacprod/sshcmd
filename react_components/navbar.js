"use strict";

var React = require("react");

module.exports = React.createClass({
    handleHome: function() {
        window.location.replace("/");
    },
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.nav(
                {
                    className: "navbar navbar-dark bg-dark"
                },
                React.DOM.a(
                    {
                        className: "navbar-brand"
                    },
                    React.DOM.i({
                        "className": "fa fa-home",
                        "aria-hidden": "true",
                        "onClick": this.handleHome
                    })
                )
            )
        );
    }
});
