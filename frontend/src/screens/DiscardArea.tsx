import React from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../globalTypes'
import { IRoomState } from '../reducers/room/room.reducer';
import { IGameState } from '../reducers/game/game.reducer';
import { IGlobalState } from '../reducers'
import { discardFromHand } from '../reducers/room/room.actions'
import { addToDiscardPile } from '../reducers/game/game.actions'
import { CardRearrangeUpdate } from '../components/Game'
import DiscardPile from './DiscardPile'

import 'typeface-roboto'
import { Grid, WithStyles, withStyles } from '@material-ui/core'
import { styles } from '../Styles'

import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector,
} from 'react-dnd'
import { dndItemTypes } from './itemTypes'

export interface DiscardAreaProps extends WithStyles<typeof styles> {
  setNextTurn: (numPlayers: number) => (void)
  numPlayers: number
  room: IRoomState
  game: IGameState
  discardFromHand: (player: Player, card: Card) => void
  addToDiscardPile: (card: Card) => void
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
  const { discardPiles } = game
  return (
    <div ref={connectDropTarget} className={classes.discardArea}
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
      const { setNextTurn, numPlayers, discardFromHand, addToDiscardPile } = props

      discardFromHand(monitor.getItem().holder,
        monitor.getItem().card)
      addToDiscardPile(monitor.getItem().card)
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

export default connect(mapStateToProps, 
  { 
    discardFromHand,
    addToDiscardPile,
  })(withStyles(styles)(discardArea))
