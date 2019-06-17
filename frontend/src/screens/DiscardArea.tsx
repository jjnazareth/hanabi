import React, { useState, useEffect } from 'react'
import { IGlobalState } from '../reducers'

import { withStyles } from '@material-ui/core'

import 'typeface-roboto'
import { styles } from '../Styles'
import { connect } from 'react-redux'
import { discard } from '../reducers/room/room.actions'
import { Card, Player } from '../globalTypes'
import { CardRearrangeUpdate } from '../components/Game'
import { Grid, Paper, WithStyles } from '@material-ui/core'
import { Typography } from '@material-ui/core'


import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector,
} from 'react-dnd'

import { dndItemTypes } from './itemTypes'
import { setNextTurn } from '../reducers/game/game.actions';
import { IRoomState } from '../reducers/room/room.reducer';
import { IGameState } from '../reducers/game/game.reducer';
import DiscardPile from './DiscardPile'

export interface DiscardAreaProps extends WithStyles<typeof styles> {
  setNextTurn: (numPlayers: number) => (void)
  numPlayers: number
  room: IRoomState
  game: IGameState
  discard: (player: Player, card: Card) => void
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const DiscardArea: React.FC<DiscardAreaProps> = ({
  //setNextTurn,
  numPlayers,
  room,
  game,
  canDrop,
  isOver,
  connectDropTarget,
  classes
}) => {

  const isActive = canDrop && isOver
  let colour = isActive ? '#FF7043' : '#FCE4EC'
  const { lastDiscard: card } = room
  const { discardPiles } = game
  return (
    <div ref={connectDropTarget} className={classes.discards}
      style={{ backgroundColor: colour }}>
      <h3>{isActive ? 'Release to Discard' : 'Discards'}</h3>
      <Grid container className={classes.buildCards} justify="center" direction="row" spacing={1}>
          {discardPiles.map(({ colour, cards }, i) => (
            <DiscardPile key={i} cards={cards} />
          ))}
      </Grid>
    </div>
  )
}

const discardArea = DropTarget(

  dndItemTypes.CARD,
  {
    drop: ((props: DiscardAreaProps, monitor) => {
      const { setNextTurn, numPlayers, discard } = props

      discard(monitor.getItem().holder,
        monitor.getItem().card)
      setNextTurn(numPlayers)

    }),

    canDrop: ((props: DiscardAreaProps, monitor) => {
      return monitor.getItem().isTurn && !CardRearrangeUpdate.toUpdate
    })
  },

  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(DiscardArea)

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
  game: state.game
})

export default connect(mapStateToProps, { discard })(withStyles(styles)(discardArea))

