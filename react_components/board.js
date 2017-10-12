/* global module:true */

"use strict";

var React = require("react"),
    request = require("superagent");

module.exports = React.createClass({
    checkConnection: function() {
        request
            .get("/api/ping/" + this.props.params.ip)
            .end(function(err, res) {
                if (err) {
                    // Stop ping loop process of server does not respond anymore.
                    clearInterval(this.checkConnection);
                    console.log(err);
                } else {
                    var alertState = "alert-danger";
                    if (res.body === true) {
                        alertState = "alert-success";
                    }

                    this.setState({
                        alertState: alertState
                    });
                }
            }.bind(this));
    },
    componentDidMount: function() {
        setInterval(this.checkConnection, 2000);
    },
    getInitialState: function() {
        return {
            sshresult: "",
            alertState: "alert-light"
        };
    },
    handleSubmit: function(e) {
        e.preventDefault();
        request
            .post("/api/cmd")
            .send({
                ip: this.props.params.ip,
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
    render: function() {
        return React.DOM.div(
            null,
            React.DOM.div({
                className: "alert " + this.state.alertState,
                role: "alert"
            }, this.props.params.ip),
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
                {
                    className: "card"
                },
                React.DOM.div(
                    {
                        className: "card-body"
                    },
                    this.state.sshresult
                )
            )
        );
    }
});
