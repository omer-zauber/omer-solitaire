import React, { Component } from "react";
import Deck from "../utils/Deck";
//import cardback from './cardback.png'

export default class AlternateApp extends Component {
  state = {
    reserveDeck: new Deck()
  };
  render() {
    return (
      <div>
        <ul style={{ listStyleType: "none" }}>
          {this.state.reserveDeck.map((card, index) =>
            <li key={index}>
              <img
                src={card.img}
                alt="card"
                style={{
                  zIndex: index,
                  position: "absolute",
                  top: index * 25,
                  left: Math.random() * 4 - 2,
                  maxWidth: "120px"
                }}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }
}
//<img src={cardback} alt="card back"/>
//<img src="../../images/cardback.png" alt=""/>
//<img src="../../images/cardback.png" alt=""/>
//<img src="../../images/cards/10_of_clubs.svg" alt=""/>
// ul {
//   list-style-type: none;
// }
