import React from "react";
import cardBack from "../images/cardback.png";
import stackPlacement from "../images/stackPlacement.png";

const ReserveDeck = props =>
  <div style={{ display: "flex", width: 540 }}>
    <div>
      <ul onClick={props.handleReserveDeckDraw}>
        {props.reserveDeck.length === 0
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
          : props.reserveDeck.map((card, index) =>
              <li key={index}>
                <img
                  src={cardBack}
                  alt="unturned card"
                  style={{
                    zIndex: index,
                    position: "absolute",
                    top: (card.value - 6.5) / 4,
                    left: index * 2,
                    width: "120px"
                  }}
                />
              </li>
            )}
      </ul>
    </div>
    <div>
      <ul>
        {props.openCards.length === 0
          ? <li></li>
          : props.openCards.map((card, index) =>
              <li
                key={index}
                onClick={
                  index === props.openCards.length - 1
                    ? event => {
                        props.handleCardPicked(card, "open", false);
                      }
                    : null
                }
              >
                <img
                  src={card.img}
                  alt={card.value + card.suit}
                  style={{
                    zIndex: index,
                    position: "absolute",
                    top: (card.value - 6.5) / 4,
                    left: index * 25 + (card.value - 6.5) / 4,
                    maxWidth: "120px"
                  }}
                />
              </li>
            )}
      </ul>
    </div>
    <div>
      <ul>
        {props.wasteDeck.map((card, index) =>
          <li key={index}>
            <img
              src={cardBack}
              alt="unturned card"
              style={{
                zIndex: index,
                position: "absolute",
                top: (card.value - 6.5) / 4,
                left: index * 2,
                width: "120px"
              }}
            />
          </li>
        )}
      </ul>
    </div>
  </div>;

export default ReserveDeck;

//clicking on RD - send all open cards to waste if RD is empty put waste in RD, empty waste.
//can only click on -last- open card
