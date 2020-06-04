import React, { Component } from "react";
import Header from "./Header";
import ProfileForm from "./ProfileForm";
import Footer from "./Footer";
import history from './history';


class ProfilePage extends Component {
    render() {
        return (
            <div id="wrapper">
                <Header />
                <ProfileForm  history={this.props.history}/>
                <Footer />
            </div>
        );
    }
}

export default ProfilePage;
