import React, { useState } from 'react'
import CardDisplay from './CardDisplay'
import update from 'immutability-helper'
import { Card, CardColour, CardRank} from '../globalTypes'
const style = {
	width: 300,

}

const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

const cardsInHand: Card[] = [
	{ idx : 1, colour: CardColour.RED, rank: CardRank.Rank1 },
	{ idx : 2, colour: CardColour.WHITE, rank: CardRank.Rank2 },
	{ idx : 4, colour: CardColour.WHITE, rank: CardRank.Rank4 },
	{ idx : 6, colour: CardColour.RED, rank: CardRank.Rank3 },
]

/* export interface ContainerState {
	cardsInHand: Array<{
		id: number
		text: string
	}>
} */

const Board: React.FC = () => {
	{
		const [cards, setCards] = useState(cardsInHand)

		const moveCard = (dragIndex: number, hoverIndex: number) => {
			const dragCard = cards[dragIndex]
			console.log ('Drag', dragIndex)
			console.log ( 'Hover', hoverIndex)
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

export default Board
