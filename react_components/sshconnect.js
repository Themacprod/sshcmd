var React = require('react'),
    request = require('superagent'),
    boardcardgroup = require('./boardcardgroup');

module.exports = React.createClass({
    componentWillMount: function () {
        var that = this;
        request
            .get('/api/user')
            .end((err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    that.createBoardCard(res.body);
                }
            });
    },
    getInitialState: function () {
        return {
            boardlayout: 'Getting configuration ...'
        };
    },
    createBoardCard: function (data) {
        var boardlayout = React.createElement(boardcardgroup, {
            data: data
        });

        this.setState({
            boardlayout: boardlayout
        });
    },
    render: function () {
        return React.DOM.div(
            null,
            this.state.boardlayout
        );
    }
});
