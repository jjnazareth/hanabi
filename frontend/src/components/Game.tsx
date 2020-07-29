import React from 'react'
import { Card } from '../globalTypes'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'
import Hand from './cards/Hand'
import Table from './cards/Table'
import Hint from './cards/Hint'

import 'typeface-roboto'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from '../Styles'

export class CardRearrangeUpdate {
  static cards: Card[]
  static toUpdate: boolean = false
  static set(cards: Card[]) {
    this.cards = cards
  }
}

interface IProps {
  room: IRoomState
  game: IGameState
}

const Game: React.FC<IProps> = ({ room, game }) => {
  const classes = useStyles()
  const loginPlayer = () => room.players.find(p => p.isLoggedIn)
  const loginPlayerName = () => {
    let player = loginPlayer()
    return player ? player.name : "No person"
  }

  const loginPlayerIdx = () => {
    let player = loginPlayer()
    return player ? player.turnIdx : 0
  }

  const currentPlayerName = () => {
    let player = room.players.find(p => (p.turnIdx == game.currentTurnIdx))
    return player ? player.name : "No person"
  }
  const dealerName = () => {
    let player = room.players.find(p => (p.turnIdx == game.dealerIdx))
    return player ? player.name : "No dealer"
  }

  return (
    <div style={{ backgroundColor: "lightGrey" }}>
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
      <Grid container>
        <Grid item xs={5}>
          {room.players.sort((p, q) => {
            const len = room.players.length
            // const fn = (idx: number) => (idx - game.currentTurnIdx + len) % len
            const fn = (idx: number) => (idx - loginPlayerIdx() + len) % len
            return fn(p.turnIdx) - fn(q.turnIdx)
          }).map((player, i) => {
            const isTurn = game.currentTurnIdx == player.turnIdx
            return (
              <div key={i} className={classes.background} >
                <Hint holder={player} isTurn={isTurn} />
                <Hand holder={player} isTurn={isTurn} />
              </div>
            )
          })}
        </Grid>
        <Grid item xs={7} className={classes.background}>
          <Table numPlayers={room.players.length} />
        </Grid>
      </Grid>
      {/* {console.log(game.hints)} */}
    </div>
  )
}


export default Game
