import React from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../globalTypes'
import { IRoomState } from '../reducers/room/room.reducer';
import { IGameState } from '../reducers/game/game.reducer';
import { IGlobalState } from '../reducers'
import { discardFromHand } from '../reducers/room/room.actions'
import { addToDiscardPile, addToBuildPile } from '../reducers/game/game.actions'

import BuildPile from './BuildPile'

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


export interface BuildAreaProps extends WithStyles<typeof styles> {
  numPlayers: number
  setNextTurn: (numPlayers: number) => (void)
  room: IRoomState
  game: IGameState
  discardFromHand: (player: Player, card: Card) => void
  addToDiscardPile: (card: Card) => void
  addToBuildPile: (card: Card) => void
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const BuildArea: React.FC<BuildAreaProps> = ({
  numPlayers,
  setNextTurn,
  game,
  canDrop,
  isOver,
  connectDropTarget,
  classes
}) => {

  const isActive = canDrop && isOver
  let colour = isActive ? '#AED581' : '#DCEDC8'
  const { buildPiles } = game

  return (

    <div ref={connectDropTarget} className={classes.buildArea} style={{ backgroundColor: colour }}>
      {console.log(buildPiles)}
      <h3>{isActive ? 'Release to Place' : 'Build Area'}</h3>
      <Grid container className={classes.buildCards} justify="center" direction="row" spacing={1}>
        {buildPiles.map(({ colour, cards }, i) => (
          <BuildPile key={i} cards={cards} />
        ))}
      </Grid>
    </div>
  )
}

const buildArea = DropTarget(

  dndItemTypes.CARD,
  {
    drop: ((props: BuildAreaProps, monitor) => {
      const { setNextTurn, numPlayers, discardFromHand, addToBuildPile } = props
      console.log(monitor.getItem().card)
      discardFromHand(monitor.getItem().holder,
        monitor.getItem().card)
      addToBuildPile(monitor.getItem().card)
      setNextTurn(numPlayers)
    }),
    canDrop: ((props: BuildAreaProps, monitor) => {
      return monitor.getItem().isTurn
    })
  },

  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),

  }),
)(BuildArea)

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
  game: state.game
})

export default connect(mapStateToProps,
  {
    discardFromHand,
    addToDiscardPile,
    addToBuildPile
  })(withStyles(styles)(buildArea))