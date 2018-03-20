export default class Deck {
	constructor() {
		let deck = [];

		for (let i = 1; i < 14; i++) {
			deck = [
				...deck,
				{ value: i, suit: 'Hearts' },
				{ value: i, suit: 'Spades' },
				{ value: i, suit: 'Diamonds' },
				{ value: i, suit: 'Clubs' },
			];
		}
		return deck;
	}
}

