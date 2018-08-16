const React = require('react');
const CreateReactClass = require('create-react-class');
const request = require('superagent');
const boardcardgroup = require('./boardcardgroup');

module.exports = CreateReactClass({
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
        return React.createElement(
            'div',
            null,
            this.state.boardlayout
        );
    }
});
