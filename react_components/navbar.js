const React = require('react');
const CreateReactClass = require('create-react-class');
const _ = require('lodash');

module.exports = CreateReactClass({
    handleHome: function () {
        window.location.replace('/');
    },
    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'nav',
                {
                    className: 'navbar navbar-expand-lg navbar-dark bg-dark'
                },
                React.createElement(
                    'a',
                    {
                        className: 'navbar-brand'
                    },
                    React.createElement(
                        'i',
                        {
                            className: 'fa fa-home',
                            'aria-hidden': 'true',
                            onClick: this.handleHome
                        }
                    )
                ),
                React.createElement(
                    'div',
                    {
                        className: 'collapse navbar-collapse',
                        id: 'navbarNavDropdown'
                    },
                    React.createElement(
                        'ul',
                        {
                            className: 'navbar-nav'
                        },
                        React.createElement(
                            'li',
                            {
                                className: 'nav-item',
                                onClick: this.handleHome
                            },
                            React.createElement(
                                'a',
                                {
                                    className: 'nav-link cursor-pointer'
                                }, 'Home'
                            )
                        ),
                        _.map(this.props.data, function (data, key) {
                            return React.createElement(
                                'li',
                                {
                                    className: 'nav-item',
                                    key: key
                                }, data
                            );
                        })
                    )
                )
            )
        );
    }
});
