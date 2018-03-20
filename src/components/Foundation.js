import React from 'react';
import Card from './Card';

export default props => (
	<div>
		<div>Foundation {props.index + 1}</div>
		<div>
			<ul>
				{props.cards.length === 0 ? (
					<li>Empty Pile</li>
				) : (
					props.cards.map((card, index) => (
						<li key={index}>
							<Card card={card} />
						</li>
					))
				)}
			</ul>
		</div>
	</div>
);
