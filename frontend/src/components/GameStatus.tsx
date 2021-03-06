import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from '../Styles'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'
import { Fragment } from 'react'
import Game from './Game'

interface IProps {
  room: IRoomState
  game: IGameState
}

export const GameStatus: React.FC<IProps> = ({ room, game }) => {
  const classes = useStyles()

  const loginPlayer = () => room.players.find(p => p.isLoggedIn)
  const loginPlayerName = () => {
    let player = loginPlayer()
    return player ? player.name : "No person"
  }
  const currentPlayer = () => room.players.find(p => (p.turnIdx == game.currentTurnIdx))
  const currentPlayerName = () => {
    let player = currentPlayer()
    return player ? player.name : "No person"
  }
  const dealerName = () => {
    let player = room.players.find(p => (p.turnIdx == game.dealerIdx))
    return player ? player.name : "No dealer"
  }

  return (
    <Fragment>

      <Grid container className={classes.gameState} >
        <Grid item xs={4}>
          <Typography variant="subtitle2">
            Login Name: {loginPlayerName()}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">
            Dealer: {dealerName()}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">
            Current Player: {currentPlayerName()}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2">
            Deck: {game.drawDeck.length} cards
                </Typography>
        </Grid>
      </Grid>
    </Fragment>
  )
}

