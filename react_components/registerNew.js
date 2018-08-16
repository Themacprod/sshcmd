const React = require('react');
const CreateReactClass = require('create-react-class');
const _ = require('lodash');
const dropdown = require('./dropdown');
const registerlistlayout = require('./registerlistlayout');
const registergridlayout = require('./registergridlayout');
const registerdetail = require('./registerdetail');

const layoutTypes = [
    'List',
    'Grid',
];

module.exports = CreateReactClass({
    getInitialState: function () {
        let detail = '-';

        if (this.props.registersDefinition.length > 0) {
            detail = this.props.registersDefinition[0];
        }

        return {
            detail: detail,
            value: '0x00',
            layoutType: layoutTypes[0],
            dataIndex: 0
        };
    },
    handleClick: function (offset) {
        console.log(offset);
        const index = _.findIndex(this.props.registersDefinition.data, function (o) {
            return o.offset === offset;
        });

        if (index >= 0) {
            this.setState({
                detail: this.props.registersDefinition.data[index]
            });
        }
    },
    handleAddressClick: function (index) {
        this.setState({
            dataIndex: index
        });
    },
    handleLayoutClick: function (e, value) {
        console.log(value);
        this.setState({
            layoutType: value
        });
    },
    render: function () {
        let layout = null;

        switch (this.state.layoutType) {
        case 'List':
            layout = React.createElement(registerlistlayout, {
                registersDefinition: this.props.registersDefinition.data,
                readData: _.fill(Array(128), '-'),
                callBack: this.handleClick
            });
            break;

        case 'Grid':
            layout = React.createElement(registergridlayout, {
                registersDefinition: this.props.registersDefinition.data,
                readData: _.fill(Array(128), '-'),
                callBack: this.handleClick
            });
            break;

        default:
            // Not handled yet.
            if (this.state.layoutType) {
                console.log(this.state.layoutType);
            }

            break;
        }

        return React.createElement(
            'div',
            {
                className: 'registercontainer'
            },
            React.createElement(dropdown, {
                descriptor: 'Layout',
                data: layoutTypes,
                id: 'layout',
                callbackChange: this.handleLayoutClick
            }),
            React.createElement(
                'div',
                {
                    className: 'registerlist'
                },
                layout
            ),
            React.createElement(registerdetail, {
                detail: this.state.detail,
                value: this.state.value
            })
        );
    }
});
