const React = require('react');
const CreateReactClass = require('create-react-class');
const _ = require('lodash');
const registerline = require('./registerline');

module.exports = CreateReactClass({
    render: function () {
        const that = this;
        return React.createElement(
            'table',
            {
                className: 'table table-hover table-sm table-bordered text-small'
            },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    {
                        className: 'table-dark'
                    },
                    React.createElement(
                        'th',
                        null,
                        'Offset'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Name'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Value'
                    )
                )
            ),
            _.map(this.props.registersDefinition, function (registerDefinition, index) {
                return React.createElement(registerline, {
                    key: index,
                    offset: registerDefinition.offset,
                    name: registerDefinition.name,
                    value: that.props.readData[index],
                    callBack: that.props.callBack
                });
            })
        );
    }
});
