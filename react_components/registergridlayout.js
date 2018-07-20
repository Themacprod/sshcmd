var React = require('react'),
    _ = require('lodash');

var toHex = function (data) {
    if (data === '-') {
        return data;
    }

    if (typeof data !== 'undefined') {
        if (Number.isInteger(data.substring(2))) {
            return data.substring(2);
        }
    }

    return '-';
};

module.exports = React.createClass({
    handleClick: function (offset) {
        this.props.callBack(offset);
    },
    getTooltipsData: function (columnIdx, lineIdx) {
        var offset = columnIdx + (lineIdx * 16);

        var startIndex = _.findIndex(this.props.data, (o) => {
            return o.offset === offset;
        });

        var description = '';

        if (startIndex >= 0) {
            description = ` - ${this.props.data[startIndex].name}`;
        }

        let data = offset.toString(16).toUpperCase();

        if (data.length === 1) {
            data = `0${data}`;
        }

        return `0x${data}${description}`;
    },
    render: function () {
        var max = _.maxBy(this.props.data, (data) => {
            return data.offset;
        });

        var gridData = _.fill(Array(max.offset + 1), '-');
        const that = this;

        _.forEach(this.props.data, (data, index) => {
            gridData[data.offset] = that.props.readData[index];
        });

        const header = [];

        for (let i = 0; i < 16; i += 1) {
            header.push(React.DOM.div(
                {
                    className: 'registergrid-item text-bold',
                    key: i
                },
                `0${i.toString(16).toUpperCase()}`
            ));
        }

        return React.DOM.div(
            {
                className: 'registergridlayout'
            },
            React.DOM.div({
                className: 'text-center',
                key: 0
            }, header),
            _.map(_.chunk(gridData, 16), (line, lineIdx) => {
                return React.DOM.div(
                    {
                        className: 'text-center',
                        key: lineIdx
                    },
                    _.map(line, (data, columnIdx) => {
                        return React.DOM.div(
                            {
                                className: 'registergrid-item',
                                key: columnIdx,
                                onClick: that.handleClick.bind(that, columnIdx + lineIdx),
                                'data-toggle': 'tooltip',
                                'data-placement': 'top',
                                title: that.getTooltipsData(columnIdx, lineIdx)
                            },
                            toHex(data)
                        );
                    })
                );
            })
        );
    }
});
