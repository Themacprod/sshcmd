var React = require('react'),
    _ = require('lodash'),
    Masonry = require('react-masonry-component'),
    boardcard = require('./boardcard');

module.exports = React.createClass({
    render: function () {
        return React.createElement(
            Masonry, {
                className: 'masonry',
                options: {
                    gutter: 14
                },
                disableImagesLoaded: false
            },
            _.map(this.props.data, (ip, index) => {
                return React.createElement(boardcard, {
                    boardIp: ip,
                    key: index
                });
            })
        );
    }
});
