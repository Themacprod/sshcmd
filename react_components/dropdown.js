const React = require('react');
const CreateReactClass = require('create-react-class');
const _ = require('lodash');

module.exports = CreateReactClass({
    onSelectChange: function (e) {
        if (this.props.callbackChange) {
            this.props.callbackChange(e, document.getElementById(`${e.target.id}`).value);
        }
    },
    render: function () {
        return React.createElement(
            'div',
            {
                className: 'selector'
            },
            React.createElement(
                'div',
                {
                    className: 'input-group mb-3 text-small'
                },
                React.createElement(
                    'div',
                    {
                        className: 'input-group-prepend'
                    },
                    React.createElement(
                        'label',
                        {
                            className: 'input-group-text'
                        },
                        this.props.descriptor
                    ),
                    React.createElement(
                        'select',
                        {
                            className: 'form-control',
                            id: this.props.id,
                            onChange: this.onSelectChange
                        },
                        _.map(this.props.data, function (option, key) {
                            return React.createElement(
                                'option',
                                {
                                    value: option,
                                    key: key
                                },
                                option
                            );
                        })
                    )
                )
            )
        );
    }
});
