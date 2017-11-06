/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        var tmp = _.map(nextProps.parent, function(field, index) {
            return React.DOM.div(
                {
                    className: "field-detail-bit-detail1 table-bordered",
                    key: index,
                    style: {
                        width: (35 * field.size) + "px"
                    }
                },
                React.DOM.div({
                    className: "field-detail-bit-detail"
                }, field.name)
            );
        });

        this.setState({
            value: tmp
        });
    },
    getInitialState: function() {
        var value = [];

        for (let i = 0; i < 7; i += 1) {
            var tmp = React.DOM.div({
                    className: "field-detail-bit-detail table-bordered",
                    key: i,
                    style: {
                        width: "200px",
                        marginTop: "-35px"
                    }
                }, "Description field");

            value.push(tmp);
        }

        return {
            value: value
        };
    },
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
                this.state.value
            )
        );
    }
});
