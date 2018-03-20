export default ({ piles, reserveDeck, wasteDeck }) => {
	for (let pileNumnber = 0; pileNumnber < 7; pileNumnber++) {
		const pile = { faceDown: reserveDeck.splice(-pileNumnber, pileNumnber), turnedUp: [reserveDeck.pop()] };
		piles.push(pile);
	}
	return { piles, reserveDeck, wasteDeck };
};
