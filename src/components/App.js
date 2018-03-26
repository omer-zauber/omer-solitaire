import React, { Component } from "react";
import Card from "./Card";
import Pile from "./Pile";
import Foundation from "./Foundation";
import ReserveDeck from "./ReserveDeck";
import Deck from "../utils/Deck";
import shuffle from "../utils/shuffle";
import dealPiles from "../utils/dealPiles";

/// when passing cards to foundations, check if length of each is 13. if so alert WIN
/// add restart button

export default class App extends Component {
  state = {
    piles: [],
    reserveDeck: [],
    wasteDeck: [],
    foundations: [[], [], [], []],
    openCards: [],
    clickedCard: null
  };

  componentDidMount() {
    this.setState(() => ({ reserveDeck: shuffle(new Deck()) }));
    this.setState(prevState => ({ ...dealPiles({ ...prevState }) }));
  }
  // [ CARD CLICK ]
  handleCardPicked = (card, index, isPile = true) => {
    this.setState(() => ({ clickedCard: { card, index, isPile } }));
  };

  // [ PILE PASS ]
  handleCardMoveToPile = async toPileIndex => {
    if (this.state.clickedCard === null) return;
    const { card: originCard, index: fromPileIndex } = this.state.clickedCard;
    if (this.canMoveCardToPile(originCard, toPileIndex)) {
      await this.moveCardToPile(fromPileIndex, originCard, toPileIndex);
      if (this.state.clickedCard.isPile) this.turnNewCards(fromPileIndex);
    }
    this.setState(() => ({ clickedCard: null }));
  };

  isSuitRed = suit => (suit === "Diamonds" || suit === "Hearts" ? true : false);

  canMoveCardToPile = (card, toPileIndex) => {
    const pile = this.state.piles[toPileIndex];
    if (pile.turnedUp.length === 0)
      if (card.value === 13) return true;
      else return false;
    const targetCard = pile.turnedUp[pile.turnedUp.length - 1];
    return (
      this.isSuitRed(card.suit) !== this.isSuitRed(targetCard.suit) &&
      targetCard.value === card.value + 1
    );
  };

  moveCardToPile = (fromPileIndex, card, pileNo) => {
    let fromPile;
    if (this.state.clickedCard.isPile)
      fromPile = this.state.piles[fromPileIndex].turnedUp;
    else if (this.state.clickedCard.index === "open")
      fromPile = this.state.openCards;
    else fromPile = this.state.foundations[fromPileIndex];
    const cardIndex = fromPile.indexOf(card);
    if (cardIndex === -1) return;
    const cardsToMove = fromPile.length - cardIndex;
    this.setState(({ piles, foundations }) => {
      let pulledCards;
      if (this.state.clickedCard.isPile)
        pulledCards = piles[fromPileIndex].turnedUp.splice(
          -cardsToMove,
          cardsToMove
        );
      else if (this.state.clickedCard.index === "open")
        pulledCards = this.state.openCards.pop();
      else pulledCards = foundations[fromPileIndex].pop();
      piles[pileNo].turnedUp = piles[pileNo].turnedUp.concat(pulledCards);
      return { piles, foundations };
    });
  };

  turnNewCards = fromPileIndex => {
    const pile = this.state.piles[fromPileIndex];
    if (pile.faceDown) {
      if (pile.faceDown.length !== 0 && pile.turnedUp.length === 0) {
        this.setState(({ piles }) => {
          pile.turnedUp.push(pile.faceDown.pop());
          piles[fromPileIndex] = pile;
          return { piles };
        });
      }
    }
  };

  // [ FOUNDATION PASS ]

  handleCardMoveToFoundation = async toFoundationIndex => {
    if (this.state.clickedCard === null) return;
    const { card: originCard, index: fromPileIndex } = this.state.clickedCard;
    if (this.canMoveCardToFoundation(originCard, toFoundationIndex)) {
      await this.moveCardToFoundation(
        fromPileIndex,
        originCard,
        toFoundationIndex
      ); //
      if (fromPileIndex !== "open") this.turnNewCards(fromPileIndex);
    }

    this.setState(() => ({ clickedCard: null }));
  };

  canMoveCardToFoundation = (card, toFoundationIndex) => {
    const foundation = this.state.foundations[toFoundationIndex];
    if (foundation.length === 0)
      if (card.value === 1) return true;
      else return false;
    const targetCard = foundation[foundation.length - 1];
    return card.suit === targetCard.suit && targetCard.value + 1 === card.value;
  };

  moveCardToFoundation = (fromPileIndex, card, toFoundationIndex) => {
    const fromPile =
      fromPileIndex === "open"
        ? this.state.openCards
        : this.state.piles[fromPileIndex].turnedUp;
    const cardIndex = fromPile.indexOf(card);
    if (cardIndex === -1) return;
    const cardsToMove = fromPile.length - cardIndex;

    this.setState(({ piles, foundations, openCards }) => {
      if (fromPileIndex === "open")
        foundations[toFoundationIndex] = foundations[toFoundationIndex].concat(
          openCards.splice(-cardsToMove, cardsToMove)
        );
      else
        foundations[toFoundationIndex] = foundations[toFoundationIndex].concat(
          piles[fromPileIndex].turnedUp.splice(-cardsToMove, cardsToMove)
        );
      return { foundations, piles, openCards };
    });
  };

  // [ RESERVE DECK ]

  handleReserveDeckDraw = async () => {
    await this.clearOpenCards();
    if (this.state.reserveDeck.length < 3) await this.refreshReserveDeck();
    this.drawNewCards();
  };

  clearOpenCards = () => {
    this.setState(({ wasteDeck, openCards }) => {
      return { wasteDeck: [...openCards, ...wasteDeck], openCards: [] };
    });
  };

  refreshReserveDeck = () => {
    this.setState(({ wasteDeck, reserveDeck }) => {
      return { reserveDeck: [...wasteDeck, ...reserveDeck], wasteDeck: [] };
    });
  };

  drawNewCards = () => {
    const reserveDeck = this.state.reserveDeck;
    const openCards = reserveDeck.splice(-3, 3);
    this.setState(() => ({ reserveDeck, openCards }));
  };

  // [ RENDER ]

  render() {
    return (
      <div
        className="container"
        style={{
          margin: "auto",
          width: "75%",
          padding: "10px"
        }}
      >
        <div style={{ display: "flex", padding: "70px", height:'150px' }}>
          <ReserveDeck
            reserveDeck={this.state.reserveDeck}
            openCards={this.state.openCards}
            wasteDeck={this.state.wasteDeck}
            handleReserveDeckDraw={this.handleReserveDeckDraw}
            handleCardPicked={this.handleCardPicked}
          />
          <div style={{ display: "flex" }}>
            {this.state.foundations.map((foundation, index) =>
              <Foundation
                key={index}
                index={index}
                cards={foundation}
                handleCardPicked={this.handleCardPicked}
                handleCardMoveToFoundation={this.handleCardMoveToFoundation}
              />
            )}
          </div>
        </div>
        <div style={{ display: "flex", padding: "70px" }}>
          {this.state.piles.map((pile, index) =>
            <Pile
              key={index}
              index={index}
              cards={pile}
              handleCardPicked={this.handleCardPicked}
              handleCardMoveToPile={this.handleCardMoveToPile}
            />
          )}
        </div>
        <div style={{ display: "flex", padding: "70px" }}>
          {this.state.clickedCard &&
            <div>
              Chosen Card: <Card card={this.state.clickedCard.card} /> from{" "}
              {this.state.clickedCard.isFoundation ? "foundation" : "pile"}{" "}
              {this.state.clickedCard.index + 1}
            </div>}
        </div>
      </div>
    );
  }
}
