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
						<li
							key={index}
							onClick={event => {
								props.handleCardPicked(card, props.index, false);
							}}
						>
							<Card card={card} />
						</li>
					))
				)}
			</ul>
			<button
				onClick={event => {
					props.handleCardMoveToFoundation(props.index);
				}}
			>
				Pass Here
			</button>
		</div>
	</div>
);


