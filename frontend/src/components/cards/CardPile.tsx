import React from 'react'
import { Card, CardColour, CardFace } from '../../globalTypes'
import { Grid, Paper, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'
import { CardDisplay } from './CardDisplay'

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    cardPile: { // used for build also
      position: "relative",
      width: 70,
      height: 200,
    },
  })
)


interface IProps {
  cards: Card[]
}

export const CardPile: React.FC<IProps> = ({ cards }) => {
  const classes = useStyles()
  return (
    <Grid item container className={classes.cardPile}>
      {cards.map((card, i) => (
        <div style={{ position: "absolute", top: (i * 28) }}>
          <CardDisplay card={card} index={0} cardFace={CardFace.FRONT}> </CardDisplay>
        </div>
      ))}
    </Grid>
  )
}

