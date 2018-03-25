import React from "react";

export default props =>
  <div>
    <div>
      Foundation {props.index + 1}
    </div>
    <div>
      <ul>
        {props.cards.length === 0
          ? <li>Empty Pile</li>
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
                    top: index * 25,
                    left: (card.value - 6.5) / 2,
                    maxWidth: "120px"
                  }}
                />
              </li>
            )}
      </ul>
      <button
        onClick={event => {
          props.handleCardMoveToFoundation(props.index);
        }}
      >
        Pass Here
      </button>
    </div>
  </div>;
