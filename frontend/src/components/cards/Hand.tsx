import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import update from 'immutability-helper'

import { initHand } from '../../actions'
import HandCard from './HandCard'

import { Grid } from '@material-ui/core'
import { useStyles } from '../../Styles'

interface HandProps {
  holder: Player,
  isTurn: boolean,
  allowArrange: boolean,
  initHand: (turnIdx: number, cards: Card[]) => void
}

const Hand: React.FC<HandProps> = (props) => {
  const classes = useStyles()
  {
    const { holder, isTurn, allowArrange } = props
    const [cards, setCards] = useState(holder.hand)
    useEffect(() => { setCards(holder.hand) }, [holder.hand])
    // function called every time a card is moved in position in one hand
    const moveCard = (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex]
      const updatedCards = update(cards, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      })
      setCards(updatedCards)
    }

    // function called every time a card is dropped, either to build pile, discard
    // or rearrange cards in one hand
    const dispatchMove = () => {
      const { initHand } = props
      // dispatch to redux store only when cards are rearranged in one hand
      allowArrange && initHand(holder.turnIdx, cards)
    }
    const cardsDisplay = isTurn ? Array.from(cards).reverse() : cards
    return (
      <div>
        <Grid container direction="row">
          <Grid item xs={10}>
            <Grid container className={classes.hand} justify="flex-start" direction="row"
              style={{ backgroundColor: isTurn ? "#DCEDC8" : "" }} spacing={1}>
              {cardsDisplay.map((card, i) => (
                <Grid key={card.idx} item >
                  <HandCard
                    holder={holder}
                    index={isTurn ? holder.hand.length - 1 - i : i}
                    numCards={holder.hand.length}
                    isTurn={isTurn}
                    card={card}
                    moveCard={moveCard}
                    dispatchMove={dispatchMove}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default connect(null, { initHand })(Hand)
