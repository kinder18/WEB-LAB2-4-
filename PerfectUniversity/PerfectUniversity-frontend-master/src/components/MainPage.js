import React, { Component } from "react";
import RecommendationHeader from "./RecommendationHeader";
import CourseList from "./CourseList";
import Header from "./Header";
import Footer from "./Footer";
import history from './history';


class MainPage extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header />
                <div id="main">
                    <div className="inner">
                        <RecommendationHeader />
                        <CourseList history={ this.props.history } key="movieList"/>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default MainPage;
