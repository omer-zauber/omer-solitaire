import React from 'react';
import Card from './Card';

export default props => (
	<div>
		<div>Pile {props.index + 1}</div>
		<div>
			<ul>
				{props.cards.faceDown.length === 0
					? ''
					: props.cards.faceDown.map((card, index) => <li key={index}>Faced down card</li>)}
				{props.cards.turnedUp.length === 0 ? (
					<li>Empty Pile</li>
				) : (
					props.cards.turnedUp.map((card, index) => (
						<li
							key={index}
							onClick={event => {
								props.handleCardPicked(card, props.index);
							}}
						>
							<Card card={card} />
						</li>
					))
				)}
			</ul>
			<button
				onClick={event => {
					props.handleCardMoveToPile(props.index);
				}}
			>
				Pass Here
			</button>
		</div>
	</div>
);

// // from App.js

//     handleAddOption= (option) => {
//         if (!option) return 'Enter a valid value to add an item.';
//         else if (this.state.options.indexOf(option) >-1) return 'this option already exists.';

//         this.setState((prevState) => ({options: prevState.options.concat([option])}));
//     }

// //in Card.js

//     state = {
//         error: undefined
//     }

//     handleAddOption = (e) => {
//         e.preventDefault();

//         const option = e.target.elements.option.value.trim();
//         const error = this.props.handleAddOption(option);

//         this.setState(()=>({error}));

//         if (!error) {
//             e.target.elements.option.value = '';
//         }
//     }
