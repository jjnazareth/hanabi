import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import update from 'immutability-helper'

import { initHand } from '../../actions'
import HandCard from './HandCard'
import { CardRearrangeUpdate } from '../../components/Game'

import { Grid, WithStyles, withStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../../Styles'

interface HandProps extends WithStyles<typeof styles> {
  holder: Player,
  isTurn: boolean,
  initHand: (turnIdx: number, cards: Card[]) => void
}

const Hand: React.FC<HandProps> = (props) => {
  { 
    const { classes, holder, isTurn } = props
    console.log (holder)
    const [cards, setCards] = useState(holder.hand)
    useEffect(() => { setCards(holder.hand) }, [holder.hand])
    const moveCard = (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex]
      const updatedCards = update(cards, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
      })
      setCards(updatedCards)
      CardRearrangeUpdate.set (updatedCards)
      CardRearrangeUpdate.toUpdate = true
    }

    const dispatchMove = () => {
      if (CardRearrangeUpdate.toUpdate) {
        props.initHand(holder.turnIdx, CardRearrangeUpdate.cards  )
        CardRearrangeUpdate.toUpdate = false
      }     
    }
    const cardsDisplay = isTurn? Array.from(cards).reverse(): cards
    return (
      <Grid container className={classes.hand} justify="flex-start" direction="row"
        style={{ backgroundColor: isTurn ? "#DCEDC8" : "" }} spacing={1}>
        {cardsDisplay.map((card, i) => (
          <Grid key={card.idx} item >
            <HandCard
              holder={holder}
              index={isTurn? holder.hand.length - 1 - i: i}
              numCards={holder.hand.length}
              isTurn={isTurn}
              card={card}
              moveCard={moveCard}
              dispatchMove={dispatchMove}
            />
          </Grid>
        ))}
      </Grid>
    )
  }
}
export default connect(null, { initHand })(withStyles(styles)(Hand))
