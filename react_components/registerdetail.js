const React = require('react');
const CreateReactClass = require('create-react-class');
const _ = require('lodash');
const registerfield = require('./registerfield');

module.exports = CreateReactClass({
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
        let msg = null;
        let values = null;

        if (this.props.detail.data) {
            msg = _.map(this.props.detail.data[this.state.bitIndex].description, (msg) => {
                return msg;
            });

            values = _.map(this.props.detail.data[this.state.bitIndex].values, (value, key) => {
                return React.createElement(
                    'div',
                    {
                        className: 'values',
                        key: key
                    },
                    `${value.value} : ${value.description}`
                );
            });
        }

        return React.createElement(
            'div',
            {
                className: 'registerdetail'
            },
            React.createElement(
                'div',
                {
                    className: 'title'
                },
                React.createElement(
                    'div',
                    {
                        className: 'registername text-bold'
                    },
                    `Register - ${registerName}`
                ),
                React.createElement(
                    'div',
                    {
                        className: 'resetvalue text-italic text-right'
                    },
                    `(reset value = ${resetValue})`
                )
            ),
            React.createElement(
                'hr',
                null
            ),
            React.createElement(registerfield, {
                parent: this.props.detail.data,
                callBack: this.handleClick,
                index: this.state.bitIndex
            }),
            React.createElement(
                'div',
                {
                    className: 'text-bold'
                },
                'Description'
            ),
            React.createElement(
                'hr',
                null
            ),
            React.createElement(
                'div',
                {
                    className: 'margin-sep'
                },
                msg
            ),
            React.createElement(
                'div',
                {
                    className: 'text-bold'
                },
                'List of value'
            ),
            React.createElement(
                'hr',
                null
            ),
            React.createElement(
                'div',
                {
                    className: 'margin-sep'
                },
                values
            )
        );
    }
});
