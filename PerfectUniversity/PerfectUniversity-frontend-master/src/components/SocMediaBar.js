/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";

class SocMediaBar extends Component {
    render() {
        return (
            <section>
                <h2>Follow</h2>
                <ul id="media_icons" className="icons">
                    <li id="media_icon"><a href="#" className="icon brands style2 fa-twitter"><span className="label">Twitter</span></a></li>
                    <li id="media_icon"><a href="#" className="icon brands style2 fa-facebook-f"><span className="label">Facebook</span></a></li>
                    <li id="media_icon"><a href="#" className="icon brands style2 fa-instagram"><span className="label">Instagram</span></a></li>
                    <li id="media_icon"><a href="#" className="icon solid style2 fa-phone"><span className="label">Phone</span></a></li>
                    <li id="media_icon"><a href="#" className="icon solid style2 fa-envelope"><span className="label">Email</span></a></li>
                </ul>
            </section>
        );
    }
}

export default SocMediaBar;