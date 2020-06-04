import React, { Component } from "react";

import host from '../config';


import RecommendationCourse from "./RecommendationCourse";
class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
        const access_token = localStorage.getItem('jwt access');
        const options = {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/app/film/recommend/`, options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    //<Redirect to="/login" />
                    this.props.history.push("/login/");
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    render() {
        let films = <p><strong>Loading your recommendations... Hang on...</strong></p>;
        if (this.state.loaded && typeof(this.state.data) != 'undefined' && this.state.data.length > 0){
            films = this.state.data.map(film => {
                return (
                    <RecommendationCourse href={`/film/${ film.id }`} title={ film.title } key={ film.title } tmdb={ film.tmdb } image="https://avatarfiles.alphacoders.com/139/139764.jpg" genre={film.genre.map(genre => {return(genre.name + '  ')})} />
                );
            })
            return (
                <section className="tiles">
                    { films }
                </section>
            );
        }
        return (
            <header>
                <br /><br /><br />
                { films }
            </header>
        );
    }
}

export default CourseList;
