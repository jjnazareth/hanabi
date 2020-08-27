import React from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../../globalTypes'
import { IGameState } from '../../reducers/game/game.reducer'
import { IGlobalState } from '../../reducers'
import { CardPile } from './CardPile'
import { discard } from '../../actions'
import { Grid, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'

import { useDrop } from 'react-dnd'
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
}


const _DiscardArea: React.FC<IProps> = ({ setNextTurn, game, discard }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dndItemTypes.CARD,

    drop: ((item, monitor) => {
      let player = monitor.getItem().holder
      let playerCard = monitor.getItem().card
      console.log("playerCard: ", playerCard)
      discard(playerCard, player, game.drawDeck)
      setNextTurn()
    }),

    canDrop: ((item, monitor) => {
      console.log("Monitor item: ", monitor.getItem())
      return monitor.getItem().isTurn
    }),

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })


  const isActive = canDrop && isOver
  const classes = useStyles({ isActive })
  let colour = isActive ? '#FF7043' : '#FCE4EC'
  const { discardPiles } = game
  return (
    <div ref={drop} className={classes.discardArea} style={{ backgroundColor: colour }}>
      <Typography variant="subtitle1" align="center">
        {isActive ? 'Release to Discard' : 'Discards'}
      </Typography>
      <Grid container justify="space-around" direction="row" spacing={1}>
        {discardPiles.map(({ colour, cards }, i) => (
          <CardPile key={i} cards={cards} />
        ))}
      </Grid>
    </div>
  )
}


const mapStateToProps = (state: IGlobalState) => ({
  game: state.game
})

export const DiscardArea = connect(mapStateToProps, { discard })(_DiscardArea)