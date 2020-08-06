import React from 'react'
import { Card, CardColour } from '../../globalTypes'
import { Grid, Paper, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'
// import { useStyles } from '../../Styles'


interface IStyleProps {
  colour: CardColour
}

const useStylesCard = makeStyles<Theme, IStyleProps>((theme: Theme) =>
  createStyles({
  }),
)

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    card: {
      border: '1px solid grey',
      position: "relative",
      height: 95,
      width: 70,
    },
    discardPile: { // used for build also
      position: "relative",
      width: 70,
      height: 200,
    },
    cardIdx: { position: "absolute", left: "2px" },
    cardRankTop: { position: "absolute", right: "2px" },
    cardRankMid: { position: "absolute", top: "20px", left: "20px", },
    cardNo: { position: "absolute", bottom: "0px", right: "2px" },
    cardDeck: { paddingTop: 20, },
  })
)


interface IProps {
  cards: Card[]
}

const BuildPile: React.FC<IProps> = ({ cards }) => {
  const classes = useStyles()
  return (
    // <Grid item>
    <Grid item container className={classes.discardPile}>
      {cards.map((card, i) => (
        <Paper key={i} className={classes.card}
          style={{
            background:
              card.colour.name == "Multi" ?
                'linear-gradient(to right bottom, #FFCC66, #9900FF)' : card.colour.code,

            position: "absolute", top: (i * 28)
          }}>
          {/* <div className={classes.cardRankTop}> */}
          <Typography variant="h6" className={classes.cardRankTop}> {card.rank}</Typography>
          {/* </div> */}
          {/* <div className={classes.cardRankMid}> */}
          <Typography variant="h2" className={classes.cardRankMid}> {card.rank}</Typography>
          {/* </div> */}
          {/* <div className={classes.cardNo}> */}
          <Typography variant="caption" className={classes.cardNo} >{card.idx}</Typography>
          {/* </div> */}
        </Paper>
      ))}
    </Grid>
    // </Grid>
  )
}

export default (BuildPile)