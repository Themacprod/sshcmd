/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent"),
    _ = require("lodash"),
    boardcard = require("./boardcard");

module.exports = React.createClass({
    componentWillMount: function() {
        request
            .get("/api/user")
            .end(function(err, res) {
				if (err) {
					console.log(err);
				} else {
                    this.createBoardCard(res.body);
				}
			}.bind(this));
    },
    getInitialState: function() {
        return {
            sshresult: "",
            boardlayout: null
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        request
            .post("/api/cmd")
            .send({
                ip: this.refs.ip.value.trim(),
                username: this.refs.username.value.trim(),
                password: this.refs.password.value.trim(),
                cmd: this.refs.cmd.value.trim()
            })
            .end(function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    this.setState({
                        sshresult: res.body
                    });
                }
            }.bind(this));

        return false;
    },
    createBoardCard: function(ips) {
        var boardlayout = _.map(ips, function(ip, index) {
            return React.DOM.div(
                {
                    className: "boardcard",
                    key: index
                },
                React.createElement(boardcard, {
                    cardtitle: "Board #" + index,
                    cardtext: ip
                })
            );
        });

		this.setState({
			boardlayout: boardlayout
		});
    },
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.div({
                className: "boardcards"
            }, this.state.boardlayout),
            React.DOM.form(
                {
                    name: "form",
                    noValidate: "",
                    onSubmit: this.handleSubmit
                },
                React.DOM.div(
                    {
                        className: "form-group"
                    },
                    React.DOM.label(null, "Username"),
                    React.DOM.input({
                        className: "form-control",
                        type: "text",
                        ref: "username",
                        name: "username",
                        defaultValue: "root",
                        required: true
                    })
                ),
                React.DOM.div(
                    {
                        className: "form-group"
                    },
                    React.DOM.label(null, "Password"),
                    React.DOM.input({
                        className: "form-control",
                        type: "password",
                        ref: "password",
                        name: "password"
                    })
                ),
                React.DOM.div(
                    {
                        className: "form-group"
                    },
                    React.DOM.label(null, "IP"),
                    React.DOM.input({
                        className: "form-control",
                        type: "text",
                        ref: "ip",
                        name: "ip",
                        defaultValue: "192.168.152.1",
                        required: true
                    })
                ),
                React.DOM.div(
                    {
                        className: "form-group"
                    },
                    React.DOM.label(null, "Command"),
                    React.DOM.input({
                        className: "form-control",
                        type: "text",
                        ref: "cmd",
                        name: "cmd",
                        defaultValue: "ls",
                        required: true
                    })
                ),
                React.DOM.div({
                    className: "ssh-response"
                }),
                React.DOM.button({
                    className: "btn btn-lg btn-primary btn-block",
                    type: "submit"
                }, "Submit")
            ),
            React.DOM.div(
                null,
                this.state.sshresult
            )
        );
    }
});
