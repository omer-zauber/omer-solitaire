import React from 'react';

export default props => {
	const isSuitRed = props.card.suit === 'Diamonds' || props.card.suit === 'Hearts' ? true : false;
	let cardValue = props.card.value;
	switch (props.card.value) {
		case 1:
			cardValue = 'Ace';
			break;
		case 11:
			cardValue = 'Jack';
			break;
		case 12:
			cardValue = 'Queen';
			break;
		case 13:
			cardValue = 'King';
			break;
		default:
			break;
	}
	const formatedCard = `${cardValue} of ${props.card.suit}`;

	return <div style={{ color: isSuitRed ? 'red' : 'black' }}>{formatedCard}</div>;
};


