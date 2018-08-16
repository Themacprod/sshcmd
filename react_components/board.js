const React = require('react');
const CreateReactClass = require('create-react-class');
const request = require('superagent');
const boardsystem = require('./boardsystem');

module.exports = CreateReactClass({
    checkConnection: function () {
        const that = this;
        request
            .get(`api/ping/${that.props.params.ip}`)
            .end((err, res) => {
                if (err) {
                    // Stop ping loop process of server does not respond anymore.
                    clearInterval(that.myInterval);
                } else {
                    let alertState = 'alert-danger';
                    if (res.body === true) {
                        alertState = 'alert-success';
                    }

                    this.setState({
                        alertState: alertState
                    });
                }
            });
    },
    componentDidMount: function () {
        this.myInterval = setInterval(this.checkConnection, 2000);
    },
    getInitialState: function () {
        return {
            alertState: 'alert-light'
        };
    },
    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                {
                    className: `alert ${this.state.alertState} text-center`,
                    role: 'alert'
                }, this.props.params.ip
            ),
            React.createElement(
                'div',
                null,
                React.createElement(boardsystem, {
                    title: 'Input #1',
                    deviceName: 'ADV7619',
                    link: 'ADV1'
                }),
                React.createElement(boardsystem, {
                    title: 'Input #2',
                    deviceName: 'ADV7619',
                    link: 'ADV2'
                }),
                React.createElement(boardsystem, {
                    title: 'Input #3',
                    deviceName: 'ADV7619',
                    link: 'ADV3'
                }),
                React.createElement(boardsystem, {
                    title: 'Input #4',
                    deviceName: 'ADV7619',
                    link: 'ADV4'
                })
            )
        );
    }
});
