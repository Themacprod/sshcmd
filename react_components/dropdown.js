var React = require('react'),
    _ = require('lodash');

module.exports = React.createClass({
    handleItemClick: function (index, value) {
        this.props.callBack(index, value);
    },
    render: function () {
        const that = this;

        return React.DOM.div(
            {
                className: 'dropdown'
            },
            React.DOM.button(
                {
                    className: 'btn btn-secondary dropdown-toggle',
                    type: 'button',
                    id: this.props.id,
                    'data-toggle': 'dropdown',
                    'aria-haspopup': 'true',
                    onClick: this.handleButtonClick
                },
                this.props.current
            ),
            React.DOM.div(
                {
                    className: 'dropdown-menu',
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
