import React, { Component } from "react";
import PasswordInputField from "./PasswordInputFields";
import TextInputField from "./TextInputField";
import SendButton from "./SendButton";
import history from './history';

import host from '../config';
import LoginHeader from "./LoginHeader";


class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            re_password: '',
        }
    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        })
    }

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
          password: event.target.value
        })
    }

    handleConfirmPasswordChange = event => {
        this.setState({
            re_password: event.target.value
        })
    }
    
    handleBirthDateChange = event => {
        this.setState({
            birthDate: event.target.value
        })
    }

    handleSubmit = (event, addToast) => {
        if (this.state.password == this.state.re_password) {
        event.preventDefault();
        // Authenticate User
        let options = {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch('http://yyr3ll.pythonanywhere.com/api/v1/account/users/', options)
            .then(res => {
                console.log(res);
                if (res.status != 201){
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                }
                else {
                    this.props.history.push("/login/");
                }
                return res.json();
            });
        }
    }

    handleSubmit = (event, addToast) => {
        if (this.state.password == this.state.re_password) {
            event.preventDefault();
            // Authenticate User
            let options = {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
            fetch(`${host}api/v1/account/users/`, options)
                .then(res => {
                    console.log(res);
                    if (res.status != 201) {
                        addToast("Incorrect email entered!", { appearance: 'error', autoDismiss: true, });
                    }
                    else {
                        this.props.history.push("/login/");
                    }
                    return res.json();
                });
        } else {
            addToast("Passwords do not match!", { appearance: 'error', autoDismiss: true, });
            event.preventDefault();
        }


    }
    render() {
        return (
            <div id="wrapper">
                <LoginHeader />
                <div id="main">
                    <div className="inner">
                        <h1>Register</h1>
                        <section>
                            <form method="post" className="login-form" action="#">
                                <div className="row gtr-uniform">
                                    <div className="col-6 col-12-xsmall">
                                        <TextInputField name="username" id="username" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" />
                                        <input type="email" name="demo-email" id="demo-email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email" />
                                        <PasswordInputField name="demo-password" id="demo-password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />
                                        <PasswordInputField name="confirm-password" id="confirm-password" value={this.state.re_password} onChange={this.handleConfirmPasswordChange} placeholder="Confirm Your Password" />
                                        <br />
                                        <div className="col-12">
                                            <ul className="actions">
                                                <li><SendButton buttonName="Sign Up" onSubmit={this.handleSubmit} /></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}


export default SignUpPage;
