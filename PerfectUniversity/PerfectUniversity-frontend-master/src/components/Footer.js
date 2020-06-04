import React, { Component } from "react";
import SocMediaBar from "./SocMediaBar";
import SuggestForm from "./SuggestForm";

class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <div className="inner">
                    <SuggestForm />
                    <SocMediaBar />
                </div>
            </footer>
        );
    }
}

export default Footer;