import React, { Component } from "react";

class TextInputField extends Component {
    render() {
        return (
            <input type="text" name={this.props.name} id={this.props.id} value={this.props.value} onChange={this.props.onChange} placeholder={this.props.placeholder} />
        );
    }
}

export default TextInputField;
