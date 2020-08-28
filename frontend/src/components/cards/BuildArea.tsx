import React from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import { IGameState } from '../../reducers/game/game.reducer'
import { IGlobalState } from '../../reducers'
import { CardPile } from './CardPile'
import { build } from '../../actions'
import { Grid, Typography, makeStyles, Theme, createStyles, ThemeProvider } from '@material-ui/core'

import { useDrop, } from 'react-dnd'
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
  game: IGameState
  setNextTurn: () => void
  build: (card: Card, player: Player, deck: Card[]) => void
}

const _BuildArea: React.FC<IProps> = ({ game, setNextTurn, build }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dndItemTypes.CARD,

    drop: ((item, monitor) => {
      let player = monitor.getItem().holder
      let playerCard = monitor.getItem().card
      build(playerCard, player, game.drawDeck)
      setNextTurn()
    }),

    canDrop: ((item, monitor) => {
      return monitor.getItem().isTurn
    }),

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = canDrop && isOver
  const classes = useStyles({ isActive })
  const { buildPiles } = game

  return (
    <div ref={drop} className={classes.buildArea} >
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

const mapStateToProps = (state: IGlobalState) => ({ game: state.game })
export const BuildArea = connect(mapStateToProps, { build })(_BuildArea)
