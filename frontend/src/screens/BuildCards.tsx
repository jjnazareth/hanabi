import React from 'react'
import { withStyles } from '@material-ui/core'
import { Grid, Paper, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'
import { Card, Player } from '../globalTypes'
import { Typography } from '@material-ui/core'

interface BuildCardsProps extends WithStyles<typeof styles> {
  card: Card
}

const BuildCards: React.FC<BuildCardsProps> =
  ({ classes, card }) => {
    return (

      <Paper className={classes.card}
        style={{
          background:
            card.colour.name == "Multi" ? 'linear-gradient(to right bottom, #FFCC66, #9900FF)' : card.colour.code
        }} >

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

    )
  }

export default withStyles(styles)(BuildCards)
