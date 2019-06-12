import React, { useState, useEffect } from 'react'
import HandCard from './HandCard'
import update from 'immutability-helper'
import { Card, Player } from '../globalTypes'
import { withStyles } from '@material-ui/core'
import { Grid, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'
import { connect } from 'react-redux'
import { initHand } from '../reducers/room/room.actions'

interface HandProps extends WithStyles<typeof styles> {
  holder: Player,
  isTurn: boolean,
  initHand: (turnIdx: number, cards: Card[]) => void
}

const Hand: React.FC<HandProps> = (props) => {
  {
    const { classes, holder,  isTurn } = props
    const [cards, setCards] = useState(holder.hand)

    useEffect(() => { setCards(holder.hand) }, [holder.hand])
    const moveCard = (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex]
      // alert ( "Drag: " + JSON.stringify(dragIndex)  + "Hover: " + JSON.stringify(hoverIndex))
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      )
    }
    const finishMove = () => {
      props.initHand(holder.turnIdx, props.isTurn? cards.slice().reverse(): cards)   
    }
    const displayCards = isTurn? cards.slice().reverse() : cards
    return (
      <Grid container className={classes.hand} justify="flex-start" direction="row"
        style={{ backgroundColor: isTurn ? "#DCEDC8" : "" }} spacing={1}>
        {displayCards.map((displayCard, i) => (
          <Grid key={displayCard.idx} item >
            <HandCard
              holder={holder}
              index={i}
              numCards={cards.length}
              isTurn={isTurn}
              card={displayCard}
              moveCard={moveCard}
              dropCard={finishMove}
            />
          </Grid>
        ))}
      </Grid>

    )
  }
}


export default connect(null, { initHand })(withStyles(styles)(Hand))
