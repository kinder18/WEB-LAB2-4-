import React, { Component } from "react";
import Header from "./Header";
import WatchedCourseList from "./WatchedCourseList";
import Footer from "./Footer";


class WatchedCoursesPage extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header />
                <WatchedCourseList history={this.props.history} />
                <Footer />
            </div>
        );
    }
}

export default WatchedCoursesPage;
