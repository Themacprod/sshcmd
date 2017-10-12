/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent"),
    _ = require("lodash"),
    Masonry = require("react-masonry-component"),
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
            boardlayout: "Getting configuration ..."
        };
    },
    createBoardCard: function(ips) {
        var boardlayout = _.map(ips, function(ip, index) {
            return React.createElement(boardcard, {
                boardName: "Board #" + index,
                boardIp: ip,
                key: index
            });
        });

        this.setState({
            boardlayout: boardlayout
        });
    },
    render: function() {
        return React.createElement(
            Masonry, {
                className: "masonry",
                options: {
                    gutter: 14
                },
                disableImagesLoaded: false
            },
            this.state.boardlayout
        );
    }
});
