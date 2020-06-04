import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import WatchedCoursesPage from "./components/WatchedCoursesPage";
import SearchPage from "./components/SearchPage";
import SignUpPage from "./components/SignUpPage";
import CoursePage from "./components/CoursePage";
import "./assets/css/main.css";
import history from './components/history';

class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Route path="/login/" component={LoginPage} />
                <Route path="/signup/" component={SignUpPage} />
                <Route path="/profile/" component={ProfilePage} />
                <Route exact path="/" component={MainPage} />
                <Route path="/watched/" component={WatchedCoursesPage} />
                <Route path="/search/" component={SearchPage} />
                <Route path="/film/:id" component={CoursePage} />
            </Router>
        );
    }
}

export default App;
