import React, { Component } from "react";
import TitleIcon from "./TitleIcon";


class LoginHeader extends Component {
    render() {
        return (
            <header id="header" className="no-padding-side">
                <div className="inner">
                    <TitleIcon className="logo no-margin-side"/>
                </div>
            </header>
        );
    }
}

export default LoginHeader;

