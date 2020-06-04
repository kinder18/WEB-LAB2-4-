/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SendButton from "./SendButton";
import ai from "../images/ai.jpg";
import ra from "../images/ra.png";

import host from '../config';


class CoursePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            tmdb: [],
            loaded: false,
            loaded_tmdb: false,
            placeholder: "Loading",
            watched_films: [],
            isInWatched: false,
        };
    }

    handleAddToWatched = (event, addToast) => {

        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/app/watched/set/`, options)
            .then(response => {
                if (response.status > 400) {
                    //<Redirect to="/login" />
                    this.props.history.push("/login/");
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }

                return response.json();
            })
            .then(watched_films => {


                watched_films.watched_list.push(this.state.data.id);

                this.setState({ watched_films: watched_films.watched_list });

                console.log("Modified list (for DEBUG ) " + this.state.watched_films);
                
                const add_options = {
                    method: "PUT",
                    body: JSON.stringify({ "watched_list": watched_films.watched_list }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access_token}`
                    }
                }


                fetch(`${host}api/v1/app/watched/set/`, add_options)
                    .then(response => {
                        addToast("Added to watched successfully!", { appearance: 'success', autoDismiss: true, });
                        console.log(response);
                        this.isInWatched();
                        return response.json();
                    })
            });

    }

    handleDeleteFromWatched = (event, addToast) => {

        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/app/watched/set/`, options)
            .then(response => {
                if (response.status > 400) {
                    //<Redirect to="/login" />
                    this.props.history.push("/login/");
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }

                return response.json();
            })
            .then(watched_films => {
                const indexOfFilm = watched_films.watched_list.indexOf(this.state.data.id);

                if (~indexOfFilm) {
                    watched_films.watched_list.splice(indexOfFilm, 1);
                }

                this.setState({ watched_films: watched_films.watched_list });

                console.log("Modified list (for DEBUG ) " + this.state.watched_films);
                
                const add_options = {
                    method: "PUT",
                    body: JSON.stringify({ "watched_list": watched_films.watched_list }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${access_token}`
                    }
                }


                fetch(`${host}api/v1/app/watched/set/`, add_options)
                    .then(response => {
                        addToast("Deleted from watched successfully!", { appearance: 'success', autoDismiss: true, });
                        console.log(response);
                        this.isInWatched();
                        return response.json();
                    })
            });

    }

    isInWatched = () => {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/app/watched/set/`, options)
            .then(response => {
                if (response.status > 400) {
                    //<Redirect to="/login" />
                    this.props.history.push("/login/");
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }

                return response.json();
            })
            .then(watched_films => {
                let isInWatched = Boolean(watched_films.watched_list.find(filmID => {
                    return filmID == this.state.data.id;
                }));

                this.setState({
                    isInWatched,
                });
            });
    }

    componentDidMount() {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${access_token}`
            }
        }
        fetch(`${host}api/v1/app/film/detail/${ this.props.match.params.id }`, options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.isInWatched();
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
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
        fetch(`https://api.themoviedb.org/3/movie/${ this.state.data.tmdb }?api_key=18c2fd7db94f9e4300a4700ea19affb9`, options)
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
        let movie = <h1>Film page</h1>

        if (this.state && this.state.loaded && this.state.loaded_tmdb) {
            let counter = 0;
            let genresArray = this.state.data.genre;

            let genres = genresArray.map(genre => {
                counter += 1;
                if (counter === genresArray.length) {
                    return(
                        <span>
                            { genre.name }
                        </span>
                    );
                } else {
                    return(
                        <span>
                            { genre.name }
                            <span>, </span>
                        </span>
                    );
                }
            });

            let buttonName = "Add to watched";
            let buttonHandler = this.handleAddToWatched;

            if (this.state.isInWatched) {
                buttonName = "Remove from watched";
                buttonHandler = this.handleDeleteFromWatched;
            }

            movie = (
                <div className="info-box">
                    <div className="info-box-container clearfix">
                        <div className="col-sm-8 col-sm-push-4">
                            <div className="title-block">
                                <h1>
                                    Machine Learning for kettles
                                </h1>
                            </div>
                            <div className="detail-infos">
                                <hr />
                                    <div className="detail-infos-detail">
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Rating
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                <div className="title-card-rating">
                                                    <a className="no-border-btm">
                                                        <span className="symbol1"><img src={ ra }/></span>
                                                        <span>{ this.state.tmdb.vote_average }</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Category
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                Computer Science
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Release date
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                <span>18.05.2017</span>
                                            </div>
                                        </div>
                                        <div className="clearfix">
                                            <div className="detail-infos-subheading label">
                                                Runtime
                                            </div>
                                            <div className="detail-infos-detail-values">
                                                <span>2 years</span>
                                            </div>
                                        </div>     
                                    </div>
                                <hr />
                                <div>
                                    <p className="detail-infos-subheading">Synopsis</p>
                                    <p className="text-wrap-pre-line">
                                        <span>
                                            Do you want to start working with AI, but you don't know enough?
                                            You can't find interesting job, but you are interested in IT?
                                            Start this course now and pass Turing test)
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 col-sm-pull-8">
                            <div className="title-sidebar">
                                <aside>
                                    <div className="title-poster no-radius-btm">
                                        <img src={ ai }/>
                                    </div>
                                </aside>
                            </div>
                            <div className="title-sidebar-button no-radius-top">
                                <SendButton buttonName={ buttonName } onSubmit={ buttonHandler } />
                            </div>
                        </div>
                    </div>

                </div>
            );
        }

        if (this.state.loaded && !this.state.loaded_tmdb) {
            this.loadTMDB();
        }

        return(
            <div id="wrapper">
                <Header />
                <div id="main">
                    <div className="inner">
                        { movie }
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default CoursePage;
