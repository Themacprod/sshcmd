/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    componentWillReceiveProps: function(nextProps) {
        var arrayIndex = 0;
        _.forEach(nextProps.parent, function(data) {
            for (var i = 0; i < data.size; i += 1) {
                this.state.value[arrayIndex + i] = data.name;
            }
            arrayIndex += data.size;
        }.bind(this));

        this.forceUpdate();
    },
    getInitialState: function() {
        return {
            value: _.fill(Array(8), "Description field")
        };
    },
    renderColumn: function(index) {
        return React.DOM.div(
            {
                className: "field-detail-column",
                key: index
            }, React.DOM.div({
                className: "table-bordered text-center text-bold"
            }, index),
            React.DOM.div({
                className: "field-detail-bit-detail table-bordered",
                onClick: this.handleClick.bind(this, index)
            }, this.state.value[index])
        );
    },
    handleClick: function(index) {
        this.props.callBack(index);
	},
    render: function() {
        var data = [];

        for (var i = 7; i >= 0; i -= 1) {
            data.push(this.renderColumn(i));
        }

        return React.DOM.div(
            {
                className: "text-center"
            },
            data
        );
    }
});
