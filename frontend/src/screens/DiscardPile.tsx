import React from 'react'
import { withStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'
import BuildCards from './BuildCards'
import { Grid, Paper, WithStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { Card } from '../globalTypes'

interface DiscardPileProps extends WithStyles<typeof styles> {
  cards: Card[]
}

const DiscardPile: React.FC<DiscardPileProps> = (props) => {
  const { cards, classes } = props
  return (
    <Grid item>


      <Grid container className={classes.discardPile}>
        {cards.map((card, i) => (
          <Paper className={classes.card}
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

export default (withStyles(styles)(DiscardPile))