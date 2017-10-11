/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent"),
    _ = require("lodash"),
    boardcard = require("./boardcard");

module.exports = React.createClass({
    componentWillMount: function() {
        request
            .get("/api/user")
            .end(function(err, res) {
				if (err) {
					console.log(err);
				} else {
                    this.createBoardCard(res.body);
				}
			}.bind(this));
    },
    getInitialState: function() {
        return {
            boardlayout: null
        };
    },
    createBoardCard: function(ips) {
        var boardlayout = _.map(ips, function(ip, index) {
            return React.DOM.div(
                {
                    className: "boardcard",
                    key: index
                },
                React.createElement(boardcard, {
                    boardName: "Board #" + index,
                    boardIp: ip
                })
            );
        });

		this.setState({
			boardlayout: boardlayout
		});
    },
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.div({
                className: "boardcards"
            }, this.state.boardlayout)
        );
    }
});
