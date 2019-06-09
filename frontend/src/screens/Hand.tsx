import React, { useState, useEffect } from 'react'
import HandDisplay from './HandDisplay'
import update from 'immutability-helper'
import { Card, Player } from '../globalTypes'
import { withStyles } from '@material-ui/core'
import { Grid, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'


interface HandProps extends WithStyles<typeof styles> {
  holder: Player,
  isTurn: boolean
}

const Hand: React.FC<HandProps> = (props) => {
  {
    const { classes, holder, isTurn } = props
    const [cards, setCards] = useState(holder.hand)

    useEffect(() => {setCards(holder.hand)}, [holder.hand])
    const moveCard = (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex]
      setCards(
        update(cards, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        }),
      )
    }
    return (
      <Grid container className={classes.hand} justify = "flex-start" direction="row" 
      style = {{backgroundColor : isTurn? "#DCEDC8":""}} spacing={1}>
        {cards.map((card, i) => (     
          <Grid key={card.idx} item > 
            <HandDisplay
              holder={props.holder}
              index={i}
              numCards={cards.length}
              isTurn= {isTurn}
              card={card}
              moveCard={moveCard}
            />
          </Grid>
        ))}
      </Grid>

    )
  }
}

export default withStyles(styles)(Hand)
