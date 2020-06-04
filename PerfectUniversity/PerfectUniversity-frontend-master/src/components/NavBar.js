import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class NavBar extends Component {
    render() {
        return (
            <ul id="desktop_menu">
                <li id="desktop_navbarbutton"><Link to='/search'>Search</Link></li>
                <li id="desktop_navbarbutton"><Link to='/'>Recommendations</Link></li>
                <li id="desktop_navbarbutton"><Link to='/watched'>Joined Courses</Link></li>
                <li id="desktop_navbarbutton"><Link to='/profile'>Profile</Link></li>
                {/*<li id="desktop_navbarbutton"><Link to='/login' onClick={handle=>{localStorage.removeItem('jwt access'); localStorage.removeItem('jwt refresh')}}>Log Out</Link></li>*/}
            </ul>
        );
    }
}

export default NavBar;
