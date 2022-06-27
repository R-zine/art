import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({ token }) => {
	return (
		<div className="review">
			<Typography variant="h6" gutterBottom>
				Order Summary
			</Typography>
			<List textAlign="center" className="review--container">
				{token.live.line_items.map((product) => (
					<ListItem className="review--listitem" key={product.name}>
						<ListItemText primary={product.name} />
						<Typography variant="body2">
							{product.line_total.formatted_with_symbol}
						</Typography>
					</ListItem>
				))}
				<ListItem className="review--listitem">
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" className="review--total">
						{token.live.subtotal.formatted_with_symbol}
					</Typography>
				</ListItem>
			</List>
		</div>
	);
};

export default Review;
