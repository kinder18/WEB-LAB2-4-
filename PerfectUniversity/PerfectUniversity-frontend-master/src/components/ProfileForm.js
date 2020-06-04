import React, { Component } from "react";
import Checkbox from "./Checkbox";
import PasswordInputField from "./PasswordInputFields";
import SendButton from "./SendButton";
import InfoText from "./InfoText";
import WelcomeText from "./WelcomeText";

import host from '../config';


let GENRES = [];

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            deletePassword: '',
            data: [],
            loaded: false,
            placeholder: "Loading",

            preferences: GENRES.reduce(
                (options, option) => ({
                    ...options,
                    [option]: false,
                }),
                {}
            ),
        };
    }

    handlePreferenceChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            preferences: {
              ...prevState.preferences,
              [name]: !prevState.preferences[name],
            },
        }));
    }

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    handleConfirmPasswordChange = event => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleCurrentPasswordChange = event => {
        this.setState({
            currentPassword: event.target.value
        })
    }

    handleDeletePasswordChange = event => {
        this.setState({
            deletePassword: event.target.value
        })
    }

    handlePreferenceSubmit = (preferenceSubmitEvent, addToast) => {
        preferenceSubmitEvent.preventDefault();

        const selectedPreferences = (Object
            .keys(this.state.preferences)
            .filter(option => this.state.preferences[option])
        );

        console.log(`selectedPreferences: ${selectedPreferences}`);

        // Update user genres
        const access_token = localStorage.getItem('jwt access');
        let options = {
            method: "PUT",
            body: JSON.stringify({ genre_preference: selectedPreferences }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/app/preferences/set/`, options)
            .then(res => {
                console.log(res);
                if (res.status != 200){
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });

                }
                else {
                    this.props.history.push("/profile/");
                    addToast("Preferences changed successfully!", { appearance: 'success', autoDismiss: true, });
                }
                return res.json();
            });
    }

    handleLogOutSubmit = event => {
        event.preventDefault();
        localStorage.removeItem('jwt access');
        localStorage.removeItem('jwt refresh')
        this.props.history.push("/login/");
    }

    handleEmailSubmit = (event, addToast) => {
        event.preventDefault();
        // Update user email
		const access_token = localStorage.getItem('jwt access');
        let options = {
            method: "PATCH",
            body: JSON.stringify({ email: this.state.email }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
				'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/account/users/me/`, options)
            .then(res => {
                console.log(res);
                if (res.status != 200){
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                }
                else {
                    this.props.history.push("/profile/");
                    addToast("Email changed successfully!", { appearance: 'success', autoDismiss: true, });
                }
                return res.json();
            });
    }

    handlePasswordSubmit = (event, addToast) => {
        if (this.state.password == this.state.confirmPassword) {
            event.preventDefault();
            // Update user password
            const access_token = localStorage.getItem('jwt access');
            let options = {
                method: "POST",
                body: JSON.stringify({ new_password: this.state.password, re_new_password: this.state.confirmPassword, current_password: this.state.currentPassword }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${ access_token }`
                }
            }
            fetch(`${host}api/v1/account/users/set_password/`, options)
                .then(res => {
                    console.log(res);
                    if (res.status != 204){
                        addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                    }
                    else {
                        this.props.history.push("/login/");
                    }
                    return res.json();
                });
        }
        else {
            event.preventDefault();
            addToast("Passwords do not match!", { appearance: 'error', autoDismiss: true, });
        }
    }

    handleDeleteProfile = (event, addToast) => {
        addToast("Profile deletion request submitted!", { appearance: 'info', autoDismiss: true, });
        // Delete user
        const access_token = localStorage.getItem('jwt access');
        let options = {
            method: "DELETE",
            body: JSON.stringify({ current_password: this.state.deletePassword }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${ access_token }`
            }
        }
        fetch(`${host}api/v1/account/users/me/`, options)
            .then(res => {
                console.log(res);
                if (res.status != 204){
                    addToast("Something went wrong", { appearance: 'error', autoDismiss: true, });
                }
                else {
                    this.props.history.push("/signup/");
                }
                return res.json();
            });
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

        fetch(`${host}api/v1/app/genre/list/`, options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    this.props.history.push("/login");
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log(data);

                GENRES = Array.from(data.map(genre => genre.id));

                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
        fetch(`${host}api/v1/app/preferences/set/`, options)
            .then(response => {
                console.log(response);
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(preferences => {
                preferences = preferences.genre_preference;
                
                preferences.forEach(preference => {
                    this.setState(prevState => ({
                        preferences: {
                          ...prevState.preferences,
                          [preference]: !prevState.preferences[preference],
                        },
                    }));
                });
            });
    }

    render() {
        return (
            <div id="main">
                <div className="inner">
                    <h1>My Profile</h1>
                    <section className="profile-section">
                        <WelcomeText/>

                        <div>
                            {/* CHANGE PASS */}

                            <form method="post" action="#">
                                <div>
                                    <div className="row gtr-uniform">
                                        <div className="col-6 col-12-xsmall">
                                            <h3>Change Password</h3>
                                            {/*<PasswordInputField name="profile_current_password" id="profile_current_password" value={this.state.currentPassword} onChange={this.handleCurrentPasswordChange} placeholder="Current Password" />*/}
                                            <PasswordInputField
                                                name="profile_password" id="profile_password"
                                                value={ this.state.password }
                                                onChange={ this.handlePasswordChange }
                                                placeholder="New Password" />
                                            <PasswordInputField
                                                name="profile_confirm_password"
                                                id="profile_confirm_password"
                                                value={ this.state.confirmPassword }
                                                onChange={ this.handleConfirmPasswordChange }
                                                placeholder="Confirm New Password" />
                                        </div>
                                        <div className="col-12">
                                            <ul className="actions">
                                                <li id="sendButton">
                                                    <SendButton buttonName="Change!" onSubmit={ this.handlePasswordSubmit } toastMessage="Password changed successfully" />
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="user-info">
                            <h3>Everything We Know About You:</h3>
                            <InfoText />
                            <SendButton buttonName="Log Out" onSubmit={ this.handleLogOutSubmit } toastMessage="Log out completed successfully" />
                        </div>



                    </section>
                </div>
            </div>
        );
    }
}

export default ProfileForm;
