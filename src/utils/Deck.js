import cards from "./cards";

export default class Deck {
  constructor() {
    let deck = [];

    for (let i = 1; i < 14; i++) {
      deck = [
        ...deck,
        { value: i, suit: "Hearts", img: cards[i * 4 - 4] },
        { value: i, suit: "Spades", img: cards[i * 4 - 3] },
        { value: i, suit: "Diamonds", img: cards[i * 4 - 2] },
        { value: i, suit: "Clubs", img: cards[i * 4 - 1] }
      ];
    }
    return deck;
  }
}
