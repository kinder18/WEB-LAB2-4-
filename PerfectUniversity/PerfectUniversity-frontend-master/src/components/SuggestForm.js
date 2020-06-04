import React, { Component } from "react";
import SendButton from "./SendButton";
import TextInputField from "./TextInputField";

class SuggestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link: ''
        };
    }

    handleLinkChange = event => {
        this.setState({
            link: event.target.value
        })
    }
    handleSuggestSubmit = event => {
        event.preventDefault();
    }

    render() {
        return (
            <section>
                <h2>You can become a teacher!<br />Upload your course now!</h2>
                <form method="post" action="#">
                    <div className="fields">
                        <div className="field">
                            <TextInputField name="footer_link" id="footer_link" onChange={this.handleLinkChange} value={this.state.link} placeholder="Your Course Link" />
                        </div>
                    </div>
                    <ul className="actions">
                        <li><SendButton buttonName="Submit" onSubmit={this.handleSuggestSubmit} toastMessage="Course submitted successfully" /></li>
                    </ul>
                </form>
            </section>
        );
    }
}

export default SuggestForm;
