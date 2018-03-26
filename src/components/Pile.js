import React from "react";
import cardBack from "../images/cardback.png";
import stackPlacement from "../images/stackPlacement.png";

export default props =>
  <div>
    <div>
      Pile {props.index + 1}
    </div>
    <div>
      <button
        onClick={event => {
          props.handleCardMoveToPile(props.index);
        }}
      >
        Pass Here
      </button>
      <ul>
        {props.cards.faceDown.map((card, index) =>
              <li key={index}>
                <img
                  src={cardBack}
                  alt="unturned card"
                  style={{
                    zIndex: index,
                    position: "absolute",
                    top: index * 25,
                    left: (card.value - 6.5) / 2,
                    width: "120px"
                  }}
                />
              </li>
            )}
        {props.cards.turnedUp.length === 0
          ? <li>
              <img
                src={stackPlacement}
                alt="empty stack"
                style={{
                  position: "absolute",
                  width: "120px",
                  left:0
                }}
              />
            </li>
          : props.cards.turnedUp.map((card, index) =>
              <li
                key={index}
                onClick={event => {
                  props.handleCardPicked(card, props.index);
                }}
              >
                <img
                  src={card.img}
                  alt={card.value+card.suit}
                  style={{
                    zIndex: index + props.cards.faceDown.length,
                    position: "absolute",
                    top: (index + props.cards.faceDown.length) * 25,
                    left: (card.value - 6.5) / 2,
                    maxWidth: "120px"
                  }}
                />
              </li>
            )}
      </ul>
    </div>
  </div>;

