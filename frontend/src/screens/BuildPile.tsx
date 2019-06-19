import React from 'react'
import { Card } from '../globalTypes'
import 'typeface-roboto'
import {
  Grid, Paper, Typography, WithStyles, withStyles
} from '@material-ui/core'
import { styles } from '../Styles'

interface BuildPileProps extends WithStyles<typeof styles> {
  cards: Card[]
}

const BuildPile: React.FC<BuildPileProps> = (props) => {
  const { cards, classes } = props
  return (
    <Grid item>
      <Grid container className={classes.discardPile}>
        {cards.map((card, i) => (
          <Paper key={i} className={classes.card}
            style={{
              background:
                card.colour.name == "Multi" ?
                  'linear-gradient(to right bottom, #FFCC66, #9900FF)' : card.colour.code,
              position: "absolute", top: (i * 28)
            }}>
            <div className={classes.cardRankTop}>
              <Typography variant="h6"> {card.rank}</Typography>
            </div>
            <div className={classes.cardRankMid}>
              <Typography variant="h2"> {card.rank}</Typography>
            </div>
            <div className={classes.cardNo}>
              <Typography variant="caption" >{card.idx}</Typography>
            </div>
          </Paper>
        ))}
      </Grid>
    </Grid>
  )
}

export default (withStyles(styles)(BuildPile))