/* global module:true */

"use strict";

var React = require("react"),
    _ = require("lodash");

module.exports = React.createClass({
    handleButtonClick: function() {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    },
    handleItemClick: function(index, value) {
        this.props.callBack(index, value);
        this.setState({
            showDropdown: false
        });
    },
    getInitialState: function() {
        return {
            showDropdown: false
        };
    },
    render: function() {
        var showDropdown = this.state.showDropdown ? " show" : "";

        return React.DOM.div(
            {
                className: "dropdown" + showDropdown
            },
            React.DOM.button(
                {
                    "className": "btn btn-secondary dropdown-toggle",
                    "type": "button",
                    "id": this.props.id,
                    "data-toggle": "dropdown",
                    "aria-haspopup": "true",
                    "aria-expanded": this.state.showDropdown,
                    "onClick": this.handleButtonClick
                },
                this.props.current
            ),
            React.DOM.div(
                {
                    "className": "dropdown-menu" + showDropdown,
                    "aria-labelledby": this.props.id
                },
                _.map(this.props.values, function(value, index) {
                    return React.DOM.a(
                        {
                            className: "dropdown-item",
                            key: index,
                            onClick: this.handleItemClick.bind(this, index, value)
                        },
                        value
                    );
                }.bind(this))
            )
        );
    }
});
