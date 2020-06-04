import React, { Component } from "react";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import history from './history';


class LoginPage extends Component {
    render() {
        return (
            <div id="wrapper">
                <LoginHeader />
                <LoginForm history={this.props.history}/>
            </div>
        );
    }
}

export default LoginPage;
