/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import NavBar from "./NavBar";
import TitleIcon from "./TitleIcon";

class Header extends Component {
	navBarFunc() {
		var x = document.getElementById("meny");
		if (x.className === "meny") {
			x.className += "-responsive";
		} else {
			x.className = "meny";
		}
	}
	render() {
		return (
			<header id="header" className={ this.props.className }>
				<div className="header-inner">
					<div className="navbar">
						<TitleIcon className="logo"/>
						<nav id="meny" className="meny">
							<NavBar />
						</nav>
						<a className="icon no-border-btm" onClick={ this.navBarFunc }>
							<i className="nav-button fa fa-bars"></i>
						</a>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;
