import React, { Component } from "react";


class CourseImageButton extends Component {
	render() {
		return (
			<span className="image left">
				<img src={ this.props.image } alt={ this.props.alt } />
			</span>
		);
	}
}

export default CourseImageButton;