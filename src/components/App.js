import React, { Component } from 'react';
import Card from './Card';
import Pile from './Pile';
import Foundation from './Foundation';
import Deck from '../utils/Deck';
import shuffle from '../utils/shuffle';
import dealPiles from '../utils/dealPiles';

//LINE 68

export default class App extends Component {
	state = {
		piles: [],
		reserveDeck: [],
		wasteDeck: [],
		foundations: [[], [], [], []],
		openCards: [],
		clickedCard: null,
	};

	componentDidMount() {
		this.setState(() => ({ reserveDeck: shuffle(new Deck()) }));
		this.setState(prevState => ({ ...dealPiles({ ...prevState }) }));
	}
	// [ CARD CLICK ]
	handleCardPicked = (card, pileIndex) => {
		this.setState(() => ({ clickedCard: { card, pileIndex } }));
	};

	// [ PILE CLICK ]
	handleCardMoveToPile = toPileIndex => {
		if (this.state.clickedCard === null) return;
		const { card: originCard, pileIndex: fromPileIndex } = this.state.clickedCard;
		if (this.canMoveCardToPile(originCard, toPileIndex)) {
			this.moveCardToPile(fromPileIndex, originCard, toPileIndex);
			this.turnNewCards(fromPileIndex);
		}
		this.setState(() => ({ clickedCard: null }));
	};

	isSuitRed = suit => (suit === 'Diamonds' || suit === 'Hearts' ? true : false);

	canMoveCardToPile = (card, toPileIndex) => {
		const pile = this.state.piles[toPileIndex];
		if (pile.turnedUp.length === 0)
			if (card.value === 13) return true;
			else return false;
		const targetCard = pile.turnedUp[pile.turnedUp.length - 1];
		return this.isSuitRed(card.suit) !== this.isSuitRed(targetCard.suit) && targetCard.value === card.value + 1;
	};

	moveCardToPile = (fromPileIndex, card, pileNo) => {
		const fromPile = this.state.piles[fromPileIndex].turnedUp;
		const cardIndex = fromPile.indexOf(card);
		if (cardIndex === -1) return;
		const cardsToMove = fromPile.length - cardIndex;
		this.setState(prevState => {
			const piles = prevState.piles;
			piles[pileNo].turnedUp = piles[pileNo].turnedUp.concat(
				piles[fromPileIndex].turnedUp.splice(-cardsToMove, cardsToMove)
			);

			return { piles };
		});
	};

	//    SETSTATE
	turnNewCards = fromPileIndex => {
		// const pile = this.state.piles[fromPileIndex];
		// if (pile.faceDown)
		// 	if (pile.faceDown.length !== 0 && pile.turnedUp.length === 0) pile.turnedUp.push(pile.faceDown.pop());
	};

	// [ RENDER ]

	render() {
		return (
			<div>
				<div style={{ display: 'flex' }}>
					{this.state.clickedCard && (
						<div>
							<Card card={this.state.clickedCard.card} /> from pile {this.state.clickedCard.pileIndex + 1}
						</div>
					)}
				</div>
				<div>reserve deck cards:{this.state.reserveDeck.length}</div>
				<div style={{ display: 'flex' }}>
					{this.state.foundations.map((foundation, index) => (
						<Foundation key={index} index={index} cards={foundation} />
					))}
				</div>
				<div style={{ display: 'flex' }}>
					{this.state.piles.map((pile, index) => (
						<Pile
							key={index}
							index={index}
							cards={pile}
							handleCardPicked={this.handleCardPicked}
							handleCardMoveToPile={this.handleCardMoveToPile}
						/>
					))}
				</div>
			</div>
		);
	}
}
