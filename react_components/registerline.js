const React = require('react');
const CreateReactClass = require('create-react-class');

module.exports = CreateReactClass({
    toHexadecimal: function (integer) {
        if (integer < 16) {
            return `0x0${integer.toString(16).toUpperCase()}`;
        }

        return `0x${integer.toString(16).toUpperCase()}`;
    },
    getInitialState: function () {
        return {
            value: '-',
            fade: ''
        };
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value,
                fade: '-fadeout'
            });

            const that = this;
            setTimeout(() => {
                that.setState({
                    fade: ''
                });
            }, 1500);
        }
    },
    handleClick: function (offset) {
        console.log(offset);
        this.props.callBack(offset);
    },
    render: function () {
        return React.createElement(
            'tbody',
            {
                className: `item${this.state.fade}`,
                key: this.props.key,
                onClick: this.handleClick.bind(this, this.props.offset)
            },
            React.createElement(
                'tr',
                null,
                React.createElement(
                    'th',
                    {
                        className: 'text-center',
                        scope: 'row'
                    },
                    this.toHexadecimal(this.props.offset)
                ),
                React.createElement(
                    'td',
                    null,
                    this.props.name
                ),
                React.createElement(
                    'td',
                    {
                        className: 'text-center'
                    },
                    this.state.value
                )
            )
        );
    }
});
