import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<div className="error--page">
			<h1>404</h1>
			<br></br>
			<h3>You've navigated to a page that doesn't exist</h3>
			<Link to="/">
				<button className="error-btn">Back to Home</button>
			</Link>
		</div>
	);
};

export default Error;
