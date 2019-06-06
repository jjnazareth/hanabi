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
          style={{ background:
              card.colour.name == "Multi" ? 'linear-gradient(to right bottom, #FFCC66, #9900FF)' : card.colour.code
          }} >
            <Grid container justify="flex-end">
          <div style={{ "marginTop": -6 }}>
            <Typography variant="h6">{//isTurn?"":
              card.rank} </Typography>
          </div>
        </Grid>
          <Grid container justify="center" >
            <div style={{ "marginTop":-10}}>
              <Typography variant="h2">{card.rank}</Typography>
            </div>
          </Grid>

        </Paper>
     
    )
  }

export default withStyles(styles)(BuildCards)
