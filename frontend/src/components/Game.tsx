import React, { useState } from 'react'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'
import Hand from './cards/Hand'
import Table from './cards/Table'
import Hint from './cards/Hint'

import 'typeface-roboto'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from '../Styles'

interface IProps {
  room: IRoomState
  game: IGameState
}

const Game: React.FC<IProps> = ({ room, game }) => {
  const classes = useStyles()

  const loginPlayer = () => room.players.find(p => p.isLoggedIn)
  const loginPlayerId = () => {
    let player = loginPlayer()
    return player ? player.turnIdx : 0
  }
  const currentPlayer = () => room.players.find(p => (p.turnIdx == game.currentTurnIdx))
  const currentPlayerId = () => {
    let player = currentPlayer()
    return player ? player.playerId : -1
  }

  // to disambiguate drag-and-drop for rearranging cards in one hand from
  // drag-and-drop to build piles or discard
  const [allowArrange, setAllowArrange] = useState<boolean>(true)
  // callback to allow/forbid dispatch of card rearrangement to redux store
  const handleAllowArrange = (allowArrange: boolean) => setAllowArrange(allowArrange)

  return (
    <Grid container>
      <Grid item xs={5}>
        {room.players.sort((p, q) => {
          const len = room.players.length
          // player logged in is always displayed first
          // other players are in order of turn to play
          const fn = (idx: number) => (idx - loginPlayerId() + len) % len
          return fn(p.turnIdx) - fn(q.turnIdx)
        }).map((player, i) => {
          const isTurn = game.currentTurnIdx == player.turnIdx
          return (
            <div key={i} className={classes.background} >
              <Hint holder={player} isTurn={isTurn} playerId={currentPlayerId()} />
              < Hand holder={player} isTurn={isTurn} allowArrange={allowArrange} />
            </div>
          )
        })}
      </Grid>
      <Grid item xs={7} className={classes.background}>
        <Table numPlayers={room.players.length} handleAllowRearrange={handleAllowArrange} />
      </Grid>
      {/* {console.log(game.hints[game.hints.length - 1])} */}
    </Grid>
  )
}


export default Game

