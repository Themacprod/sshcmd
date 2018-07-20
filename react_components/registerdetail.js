var React = require('react'),
    _ = require('lodash'),
    registerfield = require('./registerfield');

module.exports = React.createClass({
    handleClick: function (bitIndex) {
        this.setState({
            bitIndex: bitIndex
        });
    },
    getInitialState: function () {
        return {
            bitIndex: 0
        };
    },
    componentWillReceiveProps: function () {
        this.setState({
            bitIndex: 0
        });
    },
    render: function () {
        const registerName = this.props.detail.name || 'REGISTER_NAME';
        const resetValue = this.props.detail.resetvalue || '0x00';

        return React.DOM.div(
            {
                className: 'registerdetail'
            },
            React.DOM.div(
                {
                    className: 'title'
                },
                React.DOM.div(
                    {
                        className: 'registername text-bold'
                    },
                    `Register - ${registerName}`
                ),
                React.DOM.div(
                    {
                        className: 'resetvalue text-italic text-right'
                    },
                    `(reset value = ${resetValue})`
                )
            ),
            React.DOM.hr(null),
            React.createElement(registerfield, {
                parent: this.props.detail.data,
                callBack: this.handleClick,
                index: this.state.bitIndex
            }),
            React.DOM.div(
                {
                    className: 'text-bold'
                },
                'Description'
            ),
            React.DOM.hr(null),
            React.DOM.div(
                {
                    className: 'margin-sep'
                },
                _.map(this.props.detail.data[this.state.bitIndex].description, (msg) => {
                    return msg;
                })
            ),
            React.DOM.div(
                {
                    className: 'text-bold'
                },
                'List of value'
            ),
            React.DOM.hr(null),
            React.DOM.div(
                {
                    className: 'margin-sep'
                },
                _.map(this.props.detail.data[this.state.bitIndex].values, (value, key) => {
                    return React.DOM.div(
                        {
                            className: 'values',
                            key: key
                        },
                        `${value.value} : ${value.description}`
                    );
                })
            )
        );
    }
});
