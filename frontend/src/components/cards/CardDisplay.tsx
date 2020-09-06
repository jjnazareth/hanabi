import React from 'react'
import { Card, CardColour, CardFace } from '../../globalTypes'
import { Paper, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'


interface IStyleProps {
  cardFace: CardFace
  colour: CardColour
  index: number
}

const useStyles = makeStyles<Theme, IStyleProps>((theme: Theme) =>
  createStyles({
    card: {
      border: '1px solid grey',
      position: "relative",
      height: 95,
      width: 70,
      background: ({ cardFace, colour }) => ((cardFace === CardFace.FRONT) ?
        ((colour.name === "Multi") ? 'linear-gradient(to right bottom, #FFCC66, #9900FF)' : colour.code) :
        'lightGrey'
      )
    },
    cardIdx: { position: "absolute", left: "2px", display: ({ index }) => index === 0 ? "none" : "" },
    cardRankTop: { position: "absolute", right: "2px", display: ({ cardFace }) => (cardFace === CardFace.FRONT ? "" : "none") },
    cardRankMid: { position: "absolute", top: "20px", left: "20px", display: ({ cardFace }) => (cardFace === CardFace.FRONT ? "" : "none") },
    cardNo: { position: "absolute", bottom: "0px", right: "2px" },
  })
)

interface IProps {
  cardFace: CardFace
  card: Card
  index: number
}

export const CardDisplay: React.FC<IProps> = ({ cardFace, card, index }) => {
  const { colour } = card
  const classes = useStyles({ cardFace, colour, index })
  return (
    <Paper className={classes.card} >
      <Typography variant="caption" className={classes.cardIdx}> {index}</Typography>
      <Typography variant="h6" className={classes.cardRankTop}> {card.rank}</Typography>
      <Typography variant="h2" className={classes.cardRankMid}> {card.rank}</Typography>
      <Typography variant="caption" className={classes.cardNo} >{card.idx}</Typography>
    </Paper>
  )
}