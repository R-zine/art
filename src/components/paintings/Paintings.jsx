import React from 'react';
import { nanoid } from 'nanoid';
import Painting from './Painting';
import './paintings.css';

export const Paintings = ({ products, onAddCart }) => {
	return (
		<div className="container">
			{products.map((p) => (
				<Painting data={p} key={nanoid()} onAddCart={onAddCart} />
			))}
		</div>
	);
};
