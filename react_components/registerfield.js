"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    renderColumn: function(index) {
        return React.DOM.div({
            className: "field-detail-bit-index table-bordered text-center text-bold",
            key: index
        }, index);
    },
    handleClick: function(index) {
        this.props.callBack(index);
    },
    render: function() {
        var indexDiv = [];

        for (let i = 7; i >= 0; i -= 1) {
            indexDiv.push(this.renderColumn(i));
        }

        return React.DOM.div(
            {
                className: "text-center"
            },
            React.DOM.div(
                {
                    className: "register-field-container"
                },
                indexDiv
            ),
            React.DOM.div(
                {
                    className: "field-detail-bit-detail-container text-center"
                },
                _.map(this.props.parent, function(field, index) {
                    var selected = (index === this.props.index) ? " selected" : "";
                    return React.DOM.div(
                        {
                            className: "field-detail-bit-detail1 table-bordered" + selected,
                            key: index,
                            onClick: this.handleClick.bind(this, index),
                            style: {
                                width: (35 * field.size) + "px"
                            }
                        },
                        React.DOM.div({
                            className: "field-detail-bit-detail"
                        }, field.name)
                    );
                }.bind(this))
            )
        );
    }
});
