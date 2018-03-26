import React from "react";
import stackPlacement from "../images/stackPlacement.png";

export default props =>
  <div>
    <div>
      Foundation {props.index + 1}
    </div>
    <button
        onClick={event => {
          props.handleCardMoveToFoundation(props.index);
        }}
      >
        Pass Here
      </button>
    <div>
      <ul>
        {props.cards.length === 0
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
          : props.cards.map((card, index) =>
              <li
                key={index}
                onClick={event => {
                  props.handleCardPicked(card, props.index, false);
                }}
              >
                <img
                  src={card.img}
                  alt={card.value + card.suit}
                  style={{
                    zIndex: index,
                    position: "absolute",
                    top: (card.value - 6.5) / 2,
                    left: (card.value - 6.5) / 2,
                    maxWidth: "120px"
                  }}
                />
              </li>
            )}
      </ul>

    </div>
  </div>;
