import React, { useState } from 'react'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'
import Hand from './cards/Hand'
import Table from './cards/Table'
import Hint from './cards/Hint'
import { Grid, Typography, makeStyles, Theme, createStyles } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   flexGrow: 1,
    //   margin: 0,
    //   padding: 0,
    //   minHeight: 0,
    //   minWidth: 0,
    // },
    player: {
      margin: 4,
      padding: 2,
      // flexDirection: 'row',
      // spacing: theme.spacing(2),
      backgroundColor: "yellow"
    },
  })
)

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
    <Grid container justify="space-around">
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
            <div key={i} className={classes.player} >
              <Hint holder={player} isTurn={isTurn} playerId={currentPlayerId()} />
              < Hand holder={player} isTurn={isTurn} allowArrange={allowArrange} />
            </div>
          )
        })}
      </Grid>
      <Grid item xs={7} >
        <Table numPlayers={room.players.length} handleAllowRearrange={handleAllowArrange} />
      </Grid>
      {/* {console.log(game.hints[game.hints.length - 1])} */}
    </Grid>
  )
}


export default Game

