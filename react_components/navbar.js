var React = require('react'),
    _ = require('lodash');

module.exports = React.createClass({
    handleHome: function () {
        window.location.replace('/');
    },
    render: function () {
        return React.DOM.div(
            null,
            React.DOM.nav(
                {
                    className: 'navbar navbar-expand-lg navbar-dark bg-dark'
                },
                React.DOM.a(
                    {
                        className: 'navbar-brand'
                    },
                    React.DOM.i({
                        className: 'fa fa-home',
                        'aria-hidden': 'true',
                        onClick: this.handleHome
                    })
                ),
                React.DOM.div(
                    {
                        className: 'collapse navbar-collapse',
                        id: 'navbarNavDropdown'
                    },
                    React.DOM.ul(
                        {
                            className: 'navbar-nav'
                        },
                        React.DOM.li(
                            {
                                className: 'nav-item',
                                onClick: this.handleHome
                            },
                            React.DOM.a({
                                className: 'nav-link cursor-pointer'
                            }, 'Home')
                        ),
                        _.map(this.props.data, (data, key) => {
                            return React.DOM.li({
                                className: 'nav-item',
                                key: key
                            }, data);
                        })
                    )
                )
            )
        );
    }
});
