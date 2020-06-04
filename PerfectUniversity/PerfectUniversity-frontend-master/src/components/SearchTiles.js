/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { openSidebar } from "../assets/js/sidebar";
import RecommendationCourse from "./RecommendationCourse";

import host from '../config';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;


class SearchTiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('jwt access')}`
                }
            },

            data: [],
            loaded: false,
            placeholder: "Loading",
            search: "",
        };
    }

    async fetchFilmsDecorator(url, options) {

        // Trying to make a request for the server
        const response = await fetch(url, options);
        let data = undefined;

        if (response.status > 400) {
            this.setState(() => {
                return { placeholder: "Something went wrong!" };
            });
        } else {
            data = await response.json();
        }

        this.setState(() => {
            return {
                data,
                loaded: true,
            }
        });
    }

    componentWillMount() {
        this.timer = null;
    }

    componentDidMount() {
        this.updateResults();
    }

    handleChange(event) {
        clearTimeout(this.timer);
        this.setState({ search: event.target.value.substr(0, 32) });
        this.timer = setTimeout(this.triggerChange.bind(this), WAIT_INTERVAL);
    }

    triggerChange() {
        const { search } = this.state.search;

        if (this.props.handleFiltersList !== null) {
            this.props.handleFiltersList();
        }

        if (this.props.handleSortingList !== null) {
            this.props.handleSortingList();
        }

        this.updateResults();
        this.setState({ search });
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            clearTimeout(this.timer);
            e.preventDefault();
            this.handleChange(e);
        }
    }

    updateResults() {
        let searchQuery = this.state.search ? "search=" + this.state.search : "";
        let filterQuery = this.props.filterQuery;
        let sortingQuery = this.props.sortingQuery;

        let request = `${host}api/v1/app/film/list/?${searchQuery}&${filterQuery}&${sortingQuery}`;
        console.log(request);
        this.fetchFilmsDecorator(request, this.state.options);
    }

    render() {
        let filteredFilms = <span></span>;
        let resCounter = <span>no results</span>;
        if (this.state && typeof (this.state.data.results) != 'undefined' && this.state.data.results.length > 0) {
            filteredFilms = this.state.data.results.map(film => {
                return (
                    <RecommendationCourse href={`/film/${ film.id }`} title={ film.title } key={ film.title } tmdb={ film.tmdb } image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre={film.genre.map(genre => { return (genre.name + '  ') })} />
                );
            });

            if (this.state.data.results.length > 1) {
                resCounter = `${this.state.data.results.length} results`;
            } else {
                resCounter = `${this.state.data.results.length} result`;
            }
        }

        return (
            <section className="tiles-section">
                <div className="controls">
                    <div id="search_bar" className="search-container">
                        <div className="search">
                            <i className="fa fa-filter openbtn" onClick={openSidebar} style={{ fontSize: "16px" }}></i>
                            <button id="search_button" className="search-btn" type="button">
                                <i className="fa fa-search"></i>
                            </button>
                            <span id="search_searched_count" className="search-searched-count">{ resCounter }</span>
                            <input type="text"
                                className="search-input"
                                value={ this.state.value }
                                onChange={ this.handleChange.bind(this) }
                                onKeyDown={ this.handleKeyDown.bind(this) }>
                            </input>
                        </div>
                    </div>
                </div>
                <section className="tiles">
                    { filteredFilms }
                </section>
            </section>
        );
    }
}

export default SearchTiles;
