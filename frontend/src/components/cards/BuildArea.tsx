import React from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import { IGameState } from '../../reducers/game/game.reducer'
import { IGlobalState } from '../../reducers'
import { CardPile } from './CardPile'
import { build } from '../../actions'
import { Grid, Typography, makeStyles, Theme, createStyles, ThemeProvider } from '@material-ui/core'

import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetConnector, } from 'react-dnd'
import { dndItemTypes } from './itemTypes'

interface IStyleProps {
  isActive: boolean
}
const useStyles = makeStyles<Theme, IStyleProps>((theme: Theme) =>
  createStyles({
    buildArea: ({ isActive }) => ({
      padding: 6,
      spacing: theme.spacing(2),
      width: 500,
      height: 250,
      backgroundColor: isActive ? '#AED581' : '#DCEDC8',
    }),

  })
)

interface IProps {
  setNextTurn: () => void
  game: IGameState
  build: (card: Card, player: Player, deck: Card[]) => void
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const BuildArea: React.FC<IProps> = ({ game, canDrop, isOver, connectDropTarget }) => {
  const isActive = canDrop && isOver
  const classes = useStyles({ isActive })
  // let colour = isActive ? '#AED581' : '#DCEDC8'
  const { buildPiles } = game

  return (
    <div ref={connectDropTarget} className={classes.buildArea} /* style={{ backgroundColor: colour }} */>
      <Typography variant="subtitle1" align="center">
        {isActive ? 'Release to Place' : 'Build Area'}
      </Typography>
      <Grid container justify="space-around" >
        {buildPiles.map(({ cards }, i) => (
          <CardPile key={i} cards={cards} />
        ))}
      </Grid>
    </div>
  )
}

const buildArea = DropTarget(

  dndItemTypes.CARD,
  {
    drop: ((props: IProps, monitor) => {
      const { setNextTurn, game, build } = props
      let player = monitor.getItem().holder
      let playerCard = monitor.getItem().card
      build(playerCard, player, game.drawDeck)
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
)(BuildArea)

const mapStateToProps = (state: IGlobalState) => ({
  game: state.game
})

export default connect(mapStateToProps, {
  build
})(buildArea)