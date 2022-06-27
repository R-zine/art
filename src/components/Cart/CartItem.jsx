import React from 'react';

const CartItem = ({ item, handleRemove }) => {
	return (
		<div className="cart--item">
			<img src={item.image.url} alt={item.name} className="cart--image"></img>
			<div className="cart--item--name">{item.name}</div>
			<div className="cart--single--price">
				{item.price.formatted_with_symbol}
			</div>
			<button className="remove--item" onClick={() => handleRemove(item.id)}>
				X
			</button>
		</div>
	);
};

export default CartItem;
