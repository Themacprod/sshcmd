const React = require('react');
const CreateReactClass = require('create-react-class');
const _ = require('lodash');
const request = require('superagent');
const register = require('./registerNew');

module.exports = CreateReactClass({
    getInitialState: function () {
        return {
            deviceType: [],
            selectedDevice: 'none',
            selectedDeviceOld: 'none',
            registers: [],
            selectedRegister: 'none',
            registersDefinition: [],
            fullRegistersDefinition: []
        };
    },
    getDeviceType: function () {
        request
            .get('/api/getDeviceType')
            .end((err, res) => {
                if (err) {
                    console.error('Get device type failed!');
                }

                if (res) {
                    this.setState({
                        deviceType: res.body.deviceType
                    });

                    if (res.body.deviceType.length > 0) {
                        this.setState({
                            selectedDevice: res.body.deviceType[0]
                        });

                        if (this.state.selectedDevice !== res.body.deviceType[0]) {
                            this.getDeviceRegisters(res.body.deviceType[0]);
                        }
                    }
                }
            });
    },
    getDeviceRegisters: function (deviceType) {
        request
            .get(`/api/${deviceType}/getRegistersList`)
            .end((err, res) => {
                if (err) {
                    console.error('Get device register failed!');
                }

                if (res) {
                    this.setState({
                        registers: _.map(res.body, function (e) {
                            return e.name;
                        }),
                        fullRegistersDefinition: res.body,
                        registersDefinition: res.body[0]
                    });
                }
            });
    },
    componentWillMount: function () {
        this.getDeviceType();
    },
    onSelectChange: function (e) {
        const curValue = document.getElementById(`${e.target.id}`).value;
        const index = _.findIndex(this.state.fullRegistersDefinition, function (curRegisterDef) {
            return curRegisterDef.name === curValue;
        });

        if (index >= 0) {
            this.setState({
                registersDefinition: this.state.fullRegistersDefinition[index]
            });
        }
    },
    genSelector: function (descriptor, data, id) {
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
                        descriptor
                    ),
                    React.createElement(
                        'select',
                        {
                            className: 'form-control',
                            id: id,
                            onChange: this.onSelectChange
                        },
                        _.map(data, (option, key) => {
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
    },
    toHexadecimal: function (integer) {
        if (integer < 16) {
            return `0x0${integer.toString(16).toUpperCase()}`;
        }

        return `0x${integer.toString(16).toUpperCase()}`;
    },
    render: function () {
        if (this.state.selectedDevice !== this.state.selectedDeviceOld) {
            this.state.selectedDeviceOld = this.state.selectedDevice;
            this.getDeviceRegisters(this.state.selectedDevice);
        }

        const busIndex = [];

        for (let i = 0; i <= 20; i += 1) {
            busIndex.push(i);
        }

        const i2cAddress = [];

        for (let i = 2; i <= 255; i += 2) {
            i2cAddress.push(this.toHexadecimal(i));
        }

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                {
                    className: 'selector-container'
                },
                this.genSelector('Bus index', busIndex, 'bus'),
                this.genSelector('Device type', this.state.deviceType, 'device'),
                this.genSelector('Address', i2cAddress, 'address'),
                this.genSelector('Registers', this.state.registers, 'registers')
            ),
            React.createElement(register, {
                ip: this.props.match.params.ip,
                registersDefinition: this.state.registersDefinition
            })
        );
    }
});
