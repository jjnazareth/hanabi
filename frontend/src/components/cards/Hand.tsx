import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import update from 'immutability-helper'
import { initHand } from '../../actions'
import { HandCard } from './HandCard'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'
import { Hint, getHintChoices } from './Hint'

import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetConnector, } from 'react-dnd'
import { dndItemTypes } from './itemTypes'


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
  isHidden: boolean,
  isTurn: boolean,
  playerId: number,
  // allowArrange: boolean,
  isOver: boolean,
  initHand: (turnIdx: number, cards: Card[]) => void
  connectDropTarget: ConnectDropTarget
}

const _Hand: React.FC<IProps> = ({ holder, isHidden, isTurn, playerId, initHand, connectDropTarget }) => {

  const classes = useStyles({ isTurn })
  const [cards, setCards] = useState(holder.hand)
  // const [hints, setHints] = useState(getHintChoices(holder.hand))


  useEffect(() => {
    setCards(holder.hand)
    // setHints(getHintChoices(holder.hand))
  }, [holder.hand])

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
    initHand(holder.turnIdx, cards)
  }
  const cardsDisplay = isHidden ? Array.from(cards).reverse() : cards

  return (
    <Fragment>
      <div ref={connectDropTarget} >
        <Hint holder={holder} isTurn={isTurn} playerId={playerId} hints={getHintChoices(holder.hand)} />
        <Grid container className={classes.hand} spacing={2}>
          {cardsDisplay.map((card, i) => (
            <Grid item key={card.idx}>
              <HandCard
                holder={holder}
                index={isHidden ? holder.hand.length - 1 - i : i}
                isHidden={isHidden}
                isTurn={isTurn}
                card={card}
                moveCard={moveCard}
                dispatchMove={dispatchMove}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Fragment>
  )
}

export const Hand = connect(null, { initHand })
  (
    DropTarget(
      dndItemTypes.CARD,
      {
        drop: ((props: IProps, monitor) => {
          return { arrange: true }
        }),
        canDrop: ((props: IProps, monitor) => {
          return true
        })
      },
      (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    )(_Hand)
  )