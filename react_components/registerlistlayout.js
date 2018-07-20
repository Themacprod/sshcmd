var React = require('react'),
    _ = require('lodash'),
    registerline = require('./registerline');

module.exports = React.createClass({
    render: function () {
        const that = this;
        return React.DOM.table(
            {
                className: 'table table-hover table-sm table-bordered text-small'
            },
            React.DOM.thead(
                null,
                React.DOM.tr(
                    {
                        className: 'table-dark'
                    },
                    React.DOM.th(
                        null,
                        'Offset'
                    ),
                    React.DOM.th(
                        null,
                        'Name'
                    ),
                    React.DOM.th(
                        null,
                        'Value'
                    )
                )
            ),
            _.map(this.props.data, (data, index) => {
                return React.createElement(registerline, {
                    key: index,
                    offset: data.offset,
                    name: data.name,
                    value: that.props.readData[index],
                    callBack: that.props.callBack
                });
            })
        );
    }
});
