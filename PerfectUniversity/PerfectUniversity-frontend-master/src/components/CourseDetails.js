import React, { Component } from "react";


class CourseDetails extends Component {
	render() {
		let genres = this.props.genres.map((genre) => {
			return (
				<span>{ genre }</span>
			);
		});

		return (
			<div className="content">
				{/*<h3> Description: </h3>
				<p>{this.props.desc}</p>*/}
				{/* <h3> Genres: </h3> */}
				{ genres }
			</div>
		);
	}
}

export default CourseDetails;
