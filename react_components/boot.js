/* global document:true */

"use strict";

var React = require("react"),
    ReactDOM = require("react-dom"),
    ReactRouter = require("react-router");

var Boot = React.createClass({
    render: function() {
        return React.createElement(
            ReactRouter.Router, {
                history: ReactRouter.browserHistory
            },
            React.createElement(ReactRouter.Route, {
                    path: "/:lang",
                    component: require("./app")
                }),
            React.createElement(ReactRouter.Route, {
                    path: "/:lang/:ip",
                    component: require("./board")
                }),
            React.createElement(ReactRouter.Route, {
                    path: "/:lang/:ip/adv:id",
                    component: require("./adv")
                })
        );
    }
});

ReactDOM.render(React.createElement(Boot), document.getElementById("container"));
