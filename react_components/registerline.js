var React = require('react');

module.exports = React.createClass({
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
        this.props.callBack(offset);
    },
    render: function () {
        return React.DOM.tbody(
            {
                className: `item${this.state.fade}`,
                key: this.props.key,
                onClick: this.handleClick.bind(this, this.props.offset)
            },
            React.DOM.tr(
                null,
                React.DOM.th(
                    {
                        className: 'text-center',
                        scope: 'row'
                    },
                    this.toHexadecimal(this.props.offset)
                ),
                React.DOM.td(
                    null,
                    this.props.name
                ),
                React.DOM.td(
                    {
                        className: 'text-center'
                    },
                    this.state.value
                )
            )
        );
    }
});
