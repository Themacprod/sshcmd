/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent"),
    _ = require("lodash"),
    Masonry = require("react-masonry-component"),
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
    createBoardCard: function(groupsData) {
        var boardlayout = _.map(groupsData, function(groupData, index) {
            return React.createElement(boardcardgroup, {
                data: groupData,
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
