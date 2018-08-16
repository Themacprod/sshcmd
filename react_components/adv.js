const React = require('react');
const CreateReactClass = require('create-react-class');
const register = require('./register');

module.exports = CreateReactClass({
    render: function () {
        return React.createElement(register, {
            data: [
                {
                    address: 0x98,
                    description: 'IO',
                    offset: require('../registers/adv7619/RegsIo')
                },
                {
                    address: 0x80,
                    description: 'CEC',
                    offset: require('../registers/adv7619/RegsCec')
                },
                {
                    address: 0x7C,
                    description: 'InfoFrame',
                    offset: require('../registers/adv7619/RegsInfoframe')
                },
                {
                    address: 0x4C,
                    description: 'DPLL',
                    offset: require('../registers/adv7619/RegsDpll')
                },
                {
                    address: 0x64,
                    description: 'Repeater',
                    offset: require('../registers/adv7619/RegsRepeater')
                },
                {
                    address: 0x68,
                    description: 'HDMI',
                    offset: require('../registers/adv7619/RegsHdmi')
                },
                {
                    address: 0x44,
                    description: 'CP',
                    offset: require('../registers/adv7619/RegsCp')
                },
            ],
            ip: this.props.params.ip,
            offsetsize: 8,
            bus: 3
        });
    }
});
