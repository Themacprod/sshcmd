var React = require('react'),
    _ = require('lodash');

module.exports = React.createClass({
    handleButtonClick: function () {
        this.setState({
            showDropdown: !this.state.showDropdown
        });
    },
    handleItemClick: function (index, value) {
        this.props.callBack(index, value);
        this.setState({
            showDropdown: false
        });
    },
    getInitialState: function () {
        return {
            showDropdown: false
        };
    },
    render: function () {
        const showDropdown = this.state.showDropdown ? ' show' : '';
        const that = this;

        return React.DOM.div(
            {
                className: `dropdown${showDropdown}`
            },
            React.DOM.button(
                {
                    className: 'btn btn-secondary dropdown-toggle',
                    type: 'button',
                    id: this.props.id,
                    'data-toggle': 'dropdown',
                    'aria-haspopup': 'true',
                    'aria-expanded': this.state.showDropdown,
                    onClick: this.handleButtonClick
                },
                this.props.current
            ),
            React.DOM.div(
                {
                    className: `dropdown-menu${showDropdown}`,
                    'aria-labelledby': this.props.id
                },
                _.map(this.props.values, (value, index) => {
                    return React.DOM.a(
                        {
                            className: 'dropdown-item',
                            key: index,
                            onClick: that.handleItemClick.bind(that, index, value)
                        },
                        value
                    );
                })
            )
        );
    }
});
