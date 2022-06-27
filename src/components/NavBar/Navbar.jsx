import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import cartImg from '../../assets/cart-shopping-solid.svg';

const Navbar = ({ cartData }) => {
	const location = useLocation();

	return (
		<div className="navbar">
			<Link to="/">
				<div className="navbar--title">
					<div className="img">
						<img src={logo} alt="logo" />
					</div>
					<h2 className="title">Ivan Radev / Traditional Artist</h2>
				</div>
			</Link>
			{location.pathname !== '/cart' && (
				<Link to="/cart">
					<div className="navbar-cart">
						<img src={cartImg} alt="cart" className="navbar--cart"></img>
						<div className="navbar--cart-count">{cartData.total_items}</div>
					</div>
				</Link>
			)}
		</div>
	);
};

export default Navbar;
