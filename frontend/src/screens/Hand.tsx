import React, { useState } from 'react'
import CardDisplay from './CardDisplay'
import update from 'immutability-helper'
import { Card } from '../globalTypes'

import { withStyles } from '@material-ui/core'
import { Grid, WithStyles } from '@material-ui/core'

import 'typeface-roboto'
import { styles } from '../Styles'


interface HandProps extends WithStyles<typeof styles> {
  holder: string,
  cards: Card[]
}


const Hand: React.FC<HandProps> = (props) => {
  {
    const { classes } = props
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
      <Grid container className={classes.root}  direction="row">
        {cards.map((card, i) => (
          <Grid key={card.idx} item xs={3}>
            <CardDisplay
              holder={props.holder}
              index={i}
              cardId={card.idx}
              colour={card.colour}
              rank={card.rank}
              moveCard={moveCard}
            />
          </Grid>
        ))}
      </Grid>

    )
  }
}

export default withStyles(styles)(Hand)
