import React from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import { IGameState } from '../../reducers/game/game.reducer'
import { IGlobalState } from '../../reducers'
import DiscardPile from './DiscardPile'
import { discard } from '../../actions'
import { Grid, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'

import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetConnector, } from 'react-dnd'
import { dndItemTypes } from './itemTypes'


interface IStyleProps {
  isActive: boolean
}

const useStyles = makeStyles<Theme, IStyleProps>((theme: Theme) =>
  createStyles({
    discardArea: ({ isActive }) => ({
      padding: 6,
      spacing: theme.spacing(2),
      height: 350,
      width: 500,
      backgroundColor: isActive ? '#FF7043' : '#FCE4EC'
    }),
  })
)

interface IProps {
  setNextTurn: () => void
  game: IGameState
  discard: (card: Card, player: Player, deck: Card[]) => void
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}


const DiscardArea: React.FC<IProps> = ({ setNextTurn, game, discard, canDrop, isOver, connectDropTarget }) => {
  const isActive = canDrop && isOver
  const classes = useStyles({ isActive })
  let colour = isActive ? '#FF7043' : '#FCE4EC'
  const { discardPiles } = game
  return (
    <div ref={connectDropTarget} className={classes.discardArea}
      style={{ backgroundColor: colour }}>
      <Typography variant="subtitle1" align="center">
        {isActive ? 'Release to Discard' : 'Discards'}
      </Typography>

      <Grid container justify="space-around" direction="row" spacing={1}>
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
    drop: ((props: IProps, monitor) => {
      const { setNextTurn, game, discard } = props
      let player = monitor.getItem().holder
      let playerCard = monitor.getItem().card
      discard(playerCard, player, game.drawDeck)
      setNextTurn()
    }),
    canDrop: ((props: IProps, monitor) => {
      return monitor.getItem().isTurn
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

