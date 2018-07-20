var React = require('react'),
    request = require('superagent');

module.exports = React.createClass({
    checkConnection: function () {
        const that = this;
        request
            .get(`/api/ping/${that.props.boardIp}`)
            .end((err, res) => {
                if (err) {
                    // Stop ping loop process of server does not respond anymore.
                    clearInterval(that.myInterval);
                } else {
                    let state = 'fa fa-check';
                    let connexion = 'ok';
                    if (res.body === false) {
                        state = 'fa fa-times';
                        connexion = 'nok';
                    }

                    // Get board info only when going from dead to alive connection.
                    if ((that.state.statelayout !== 'fa fa-check') && (state === 'fa fa-check')) {
                        that.checkBoardInfo = true;
                    }

                    that.setState({
                        statelayout: state,
                        cardstatus: connexion
                    });
                }
            });

        if (this.checkBoardInfo === true) {
            this.getBoardInfo();
            this.checkBoardInfo = false;
        }
    },
    getBoardInfo: function () {
        const that = this;
        request
            .get(`/api/board/${that.props.boardIp}`)
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    that.setState({
                        productName: res.body.ProductName,
                        serialNumber: res.body.SerialNumber,
                        pcbNumber: res.body.PcbNumber
                    });
                }
            });
    },
    componentDidMount: function () {
        this.checkBoardInfo = false;
        this.myInterval = setInterval(this.checkConnection, 2000);
    },
    getInitialState: function () {
        return {
            statelayout: 'fa fa-refresh fa-spin',
            productName: 'Unknown',
            serialNumber: 'Unknown',
            pcbNumber: 'Unknown',
            cardstatus: 'check'
        };
    },
    render: function () {
        return React.DOM.div(
            {
                className: 'grid-item card',
                key: this.props.boardIp
            },
            React.DOM.a(
                {
                    className: `${this.state.cardstatus} nav-link`,
                    href: `${this.props.boardIp}/`
                },
                React.DOM.div(
                    {
                        className: 'card-body'
                    },
                    React.DOM.h4(
                        {
                            className: 'card-title'
                        },
                        this.state.productName
                    ),
                    React.DOM.h6(
                        {
                            className: 'card-subtitle'
                        },
                        this.props.boardIp
                    ),
                    React.DOM.p(
                        {
                            className: 'card-text'
                        },
                        `Serial : ${this.state.serialNumber} (PCB : ${this.state.pcbNumber})`
                    ),
                    React.DOM.i({
                        className: this.state.statelayout
                    })
                )
            )
        );
    }
});
