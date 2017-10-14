/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent"),
    boardcardgroup = require("./boardcardgroup");

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
            boardlayout: "Getting configuration ..."
        };
    },
    createBoardCard: function(data) {
        var boardlayout = React.createElement(boardcardgroup, {
            data: data
        });

        this.setState({
            boardlayout: boardlayout
        });
    },
    render: function() {
        return React.DOM.div(
            null,
            this.state.boardlayout
        );
    }
});
