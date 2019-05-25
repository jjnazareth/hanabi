import React, { useState } from 'react'
import CardDisplay from './CardDisplay'
import update from 'immutability-helper'
import { Card, CardColour, CardRank} from '../globalTypes'


const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

const Hand: React.FC<{holder : string, cards: Card[]}> = (props) => {
	{
		const [cards, setCards] = useState(props.cards)
		
		const moveCard = (dragIndex: number, hoverIndex: number) => {
			const dragCard = cards[dragIndex]
			setCards(
				update(cards, {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				}),
			)
		}
		
		return (
			<div style={rowStyle}>
				{cards.map((card, i) => (
					<CardDisplay
						key={card.idx}
						holder= {props.holder}
						index={i}
						cardId={card.idx}
						colour= {card.colour}
						rank= {card.rank}
						moveCard={moveCard}
					/>
				))}
			</div>
		)
	}
}

export default Hand
