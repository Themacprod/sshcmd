const React = require('react');
const CreateReactClass = require('create-react-class');
const JQuery = require('jquery');
const History = require('history');
const ReactRouter = require('react-router-dom');
const userInput = require('./userInput');
const selector = require('./selector');

module.exports = CreateReactClass({
    componentDidMount: function () {
        global.jQuery = JQuery;
    },
    render: function () {
        return React.createElement(
            ReactRouter.Router, {
                history: History.createBrowserHistory()
            },
            React.createElement(
                'div',
                {
                    className: 'app'
                },
                React.createElement(ReactRouter.Route, {
                    path: '/',
                    exact: true,
                    component: userInput
                }),
                React.createElement(ReactRouter.Route, {
                    path: '/:ip',
                    component: selector
                })
            )
        );
    }
});
