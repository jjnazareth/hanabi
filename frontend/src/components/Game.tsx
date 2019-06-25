import React from 'react'
import { connect } from 'react-redux'
import { Card } from '../globalTypes'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'
import Hand from './cards/Hand'
import Table from './cards/Table'
import 'typeface-roboto'
import { Grid, WithStyles, Typography, withStyles } from '@material-ui/core'
import { styles } from '../Styles'

export class CardRearrangeUpdate {
  static cards: Card[];
  static toUpdate: boolean = false
  static set(cards: Card[]) {
    this.cards = cards
  }
}

interface IProps extends WithStyles<typeof styles> {
  room: IRoomState
  game: IGameState
}

const Game: React.FC<IProps> = ({ classes, room, game }) => {
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
        <Grid item xs={4}>
          {room.players.sort((p, q) => {
            const len = room.players.length
            const fn = (idx: number) => (idx - game.currentTurnIdx + len) % len
            return fn(p.turnIdx) - fn(q.turnIdx)
          }).map((player, i) =>
            <div key={i} className={classes.background} >
              <Typography variant="caption">
                {i == 0 ? (<b>{player.name}</b>) : (player.name)}
              </Typography>
              <Hand holder={player} isTurn={game.currentTurnIdx == player.turnIdx} />
            </div>
          )}
        </Grid>
        <Grid item xs={7} className={classes.background}>
          <Table />
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
  game: state.game,
})

export default connect(mapStateToProps, {

})(withStyles(styles)(Game))
