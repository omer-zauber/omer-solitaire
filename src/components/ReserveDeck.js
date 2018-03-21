import React from 'react';
import Card from './Card';

const ReserveDeck = props => (
	<div>
		<div>
			Reserve deck cards: {props.reserveDeck.length} <button onClick={props.handleReserveDeckDraw}>draw</button>
		</div>
		<div>
			Open Cards:
			<ul>
				{props.openCards.length === 0 ? (
					<li>Empty Pile</li>
				) : (
					props.openCards.map((card, index) => (
						<li
							key={index}
							onClick={
								index === props.openCards.length - 1
									? event => {
											props.handleCardPicked(card, 'open', false);
									  }
									: null
							}
						>
							<Card card={card} />
						</li>
					))
				)}
			</ul>
		</div>
		<div>Waste:{props.wasteDeck.length} </div>
	</div>
);

export default ReserveDeck;

//clicking on RD - send all open cards to waste if RD is empty put waste in RD, empty waste.
//can only click on -last- open card
