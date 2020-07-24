import React from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import { IRoomState } from '../../reducers/room/room.reducer'
import { IGameState } from '../../reducers/game/game.reducer'
import { IGlobalState } from '../../reducers'
import BuildPile from './BuildPile'
import { build } from '../../actions'


import 'typeface-roboto'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from '../../Styles'

import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector,
} from 'react-dnd'
import { dndItemTypes } from './itemTypes'

interface BuildAreaProps {
  numPlayers: number
  setNextTurn: (numPlayers: number) => (void)
  room: IRoomState
  game: IGameState
  build: (card: Card, player: Player, deck: Card[]) => void
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
  connectDropTarget, }) => {

  const classes = useStyles()
  const isActive = canDrop && isOver
  let colour = isActive ? '#AED581' : '#DCEDC8'
  const { buildPiles } = game

  return (

    <div ref={connectDropTarget} className={classes.buildArea} style={{ backgroundColor: colour }}>
      <Typography variant="subtitle1" align="center">
        {isActive ? 'Release to Place' : 'Build Area'}
      </Typography>

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
      const { setNextTurn, numPlayers, game, build } = props

      let player = monitor.getItem().holder
      let playerCard = monitor.getItem().card

      build(playerCard, player, game.drawDeck)
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

export default connect(mapStateToProps, {
  build
})(buildArea)