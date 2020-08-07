import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import update from 'immutability-helper'
import { initHand } from '../../actions'
import { HandCard } from './HandCard'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'

interface IStyleProps {
  isTurn: boolean
}

const useStyles = makeStyles<Theme, IStyleProps>((theme: Theme) =>
  createStyles({
    hand: {
      margin: 0,
      padding: 2,
      width: "99%",
      backgroundColor: ({ isTurn }) => (isTurn ? "#DCEDC8" : "#F0F4C3")
    },
  })
)

interface IProps {
  holder: Player,
  isTurn: boolean,
  allowArrange: boolean,
  initHand: (turnIdx: number, cards: Card[]) => void
}

const Hand: React.FC<IProps> = ({ holder, isTurn, allowArrange, initHand }) => {
  const classes = useStyles({ isTurn })
  const [cards, setCards] = useState(holder.hand)
  useEffect(() => { setCards(holder.hand) }, [holder.hand])

  // function called every time a card is moved in position in one hand
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex]
    const updatedCards = update(cards, {
      $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
    })
    setCards(updatedCards)
  }

  // function called every time a card is dropped, either to build pile, discard
  // or rearrange cards in one hand
  const dispatchMove = () => {
    // dispatch to redux store only when cards are rearranged in one hand
    allowArrange && initHand(holder.turnIdx, cards)
  }
  const cardsDisplay = isTurn ? Array.from(cards).reverse() : cards
  return (
    <Grid container className={classes.hand} spacing={2}>
      {/* style={{ backgroundColor: isTurn ? "#DCEDC8" : "" }}> */}
      {cardsDisplay.map((card, i) => (
        <Grid item key={card.idx}>
          <HandCard
            holder={holder}
            index={isTurn ? holder.hand.length - 1 - i : i}
            isTurn={isTurn}
            card={card}
            moveCard={moveCard}
            dispatchMove={dispatchMove}
          />
        </Grid>
      ))}
    </Grid>
  )
}
export default connect(null, { initHand })(Hand)
