import React from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import { IGameState } from '../../reducers/game/game.reducer'
import { IGlobalState } from '../../reducers'
import { CardRearrangeUpdate } from '../../components/Game'
import DiscardPile from './DiscardPile'
import { discard } from '../../actions'

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

export interface DiscardAreaProps {
  setNextTurn: () => void
  game: IGameState
  discard: (card: Card, player: Player, deck: Card[]) => void
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const DiscardArea: React.FC<DiscardAreaProps> = (props) => {
  const classes = useStyles()
  const { game, canDrop, isOver, connectDropTarget } = props
  const isActive = canDrop && isOver
  let colour = isActive ? '#FF7043' : '#FCE4EC'
  const { discardPiles } = game
  return (
    <div ref={connectDropTarget} className={classes.discardArea}
      style={{ backgroundColor: colour }}>
      <Typography variant="subtitle1" align="center">
        {isActive ? 'Release to Discard' : 'Discards'}
      </Typography>

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
      const { setNextTurn, game, discard } = props

      let player = monitor.getItem().holder
      let playerCard = monitor.getItem().card

      discard(playerCard, player, game.drawDeck)
      setNextTurn()
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
  game: state.game
})

export default connect(mapStateToProps,
  {
    discard
  })(discardArea)

