const React = require('react');
const CreateReactClass = require('create-react-class');

module.exports = CreateReactClass({
    getInitialState: function () {
        return {
            btnState: ' disabled',
            ipValid: false
        };
    },
    handleIpChange: function (e) {
        const ip = (/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/).exec(e.target.value);

        let btnState = ' disabled';
        let ipValid = false;

        if (ip) {
            btnState = 'btn btn-dark';
            ipValid = true;

            this.setState({
                ip: ip[0]
            });
        }

        this.setState({
            btnState: btnState,
            ipValid: ipValid
        });
    },
    handleButtonClick: function () {
        window.location.href = `/${this.state.ip}`;
    },
    genInput: function (id, placeholder, callback) {
        return React.createElement(
            'div',
            {
                id: id,
                className: 'input-group'
            },
            React.createElement(
                'input',
                {
                    id: id,
                    className: 'form-control form-control-lg',
                    type: 'text',
                    placeholder: placeholder,
                    onChange: callback
                }
            )
        );
    },
    render: function () {
        console.log('userinput');
        return React.createElement(
            'div',
            {
                className: 'userinput'
            },
            this.genInput(
                'ip',
                'Enter IP \'192.168.152.154\'',
                this.handleIpChange
            ),
            React.createElement(
                'div',
                {
                    className: 'userbutton'
                },
                React.createElement(
                    'button',
                    {
                        className: `btn btn-lg btn-outline-dark${this.state.btnState}`,
                        onClick: this.handleButtonClick
                    },
                    'Connect'
                )
            )
        );
    }
});
