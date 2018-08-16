var React = require('react');

module.exports = React.createClass({
    render: function () {
        return React.createElement(
            'div',
            {
                className: 'boardsystem'
            },
            React.createElement(
                'div',
                {
                    className: 'card text-center'
                },
                React.createElement(
                    'a',
                    {
                        className: 'nav-link',
                        href: `${this.props.link}/`
                    },
                    React.createElement(
                        'div',
                        {
                            className: 'card-body'
                        },
                        React.createElement(
                            'h5',
                            {
                                className: 'card-title'
                            },
                            this.props.title
                        ),
                        React.createElement(
                            'h6',
                            {
                                className: 'card-subtitle'
                            },
                            this.props.deviceName
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                {
                    className: 'padding'
                },
                ''
            )
        );
    }
});
