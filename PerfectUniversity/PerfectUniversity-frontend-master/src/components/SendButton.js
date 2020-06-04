/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useToasts, ToastProvider } from 'react-toast-notifications';

const SendButton = (props) => {
	return (
		<ToastProvider>
			<Button id={ props.id } className={ props.className ? props.className : "" } buttonName={ props.buttonName } onSubmit={ props.onSubmit } />
		</ToastProvider>
	);
}

const Button = (props) => {
    const { addToast } = useToasts()
    const onClick = (event) => {
        props.onSubmit(event, addToast);
    };

	if (props.id === "DeleteProfileButton") {
		return (
			<div className="col-6 col-12-medium">
				<ul className="actions stacked">
					{/* <li><a href="#" className="button small fit">Delete Account</a></li> */}
					<li id={ props.id }><a href="#" className="button small fit" onClick={ onClick } >{ props.buttonName }</a></li>
				</ul>
			</div>
		);
	} else {
		return (
			<button type="submit" value="Submit" className={`primary ${ props.className }`} onClick={ onClick } >{ props.buttonName }</button>
		);
	}
}

export default SendButton;
