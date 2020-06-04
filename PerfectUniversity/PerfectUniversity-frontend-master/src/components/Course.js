import React, { Component } from "react";
import RateButton from "./RateButton";
import TextInputField from "./TextInputField";
import ai from "../images/ai.jpg";


class Course extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movie_rating: "",
			tmdb: [],
			loaded_tmdb: false,
		};
	}

    handleRatingChange = event => {
        this.setState({
            movie_rating: event.target.value
        });
	}
	
	loadTMDB() {
		const access_token = localStorage.getItem('jwt access');
		const options = {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': `JWT ${access_token}`
			}
		}
		fetch(`https://api.themoviedb.org/3/movie/${ this.props.tmdb }?api_key=18c2fd7db94f9e4300a4700ea19affb9`, options)
			.then(response => {
				console.log(response);
				if (response.status > 400) {
					return this.setState(() => {
						return { placeholder: "Something went wrong!" };
					});
				}
				return response.json();
			})
			.then(tmdb => {
				console.log(tmdb);
				this.setState(() => {
					return {
						tmdb,
						loaded_tmdb: true
					};
				});
			});
	}

	render() {
		let overview = <span></span>

		if (!this.state.loaded_tmdb) {
			this.loadTMDB();
		} else {
			overview = this.state.tmdb.overview;

			return (
				<div className="col-xs-6">
					<article id="film square" className="title-card">
						<div className="col-xs-4">
							<div className="watchlist-row">
								<a className="no-border-btm" href={ this.props.link }>
									<div className="title-poster no-radius-right">
										<img className="title-poster-img" src={ ai }/>
									</div>
								</a>
							</div>
						</div>
						<div className="col-xs-8 title-card-content">
							<div className="title-card-content-title">
								<a className="no-border-btm" href={ this.props.link }>
									{ this.props.title }
								</a>
							</div>
							<p className="title-card-content-description">
								{ "VeRy InTeReStInG cOuRsE" }
							</p>
							<div className="title-card-content-bottom">
								<div id="text-input-field" className="col-6 col-12-xsmall rating-input-field">
									<TextInputField name={`rating${ this.props.film_id }`} id={`rating${ this.props.film_id }`} onChange={ this.handleRatingChange } value={ this.state.movie_rating } placeholder="0-100 points" />
								</div>
								<div className="col-12">
									<ul className="actions">
										<RateButton film_id={ this.props.film_id } movie_rating={ this.state.movie_rating } className="rating-button" />
									</ul>
								</div>
							</div>
						</div>
					</article>
				</div>
			);
		}

		return null;
	}
}

export default Movie;
