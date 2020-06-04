import React, { Component } from "react";
import logo from "../images/logo.png";

class TitleIcon extends Component {
    render() {
        return (
            <a href="/" className={this.props.className}>
                <span className="symbol"><img src={ logo } alt="" /></span><span className="title">Perfect University</span>
            </a>
        );
    }
}

export default TitleIcon;