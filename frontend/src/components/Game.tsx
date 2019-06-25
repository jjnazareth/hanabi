import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card} from '../globalTypes'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'
import { initGame } from '../actions'

import Table from './cards/Table'
import Hand from './cards/Hand'

import 'typeface-roboto'
import { Grid, WithStyles, withStyles } from '@material-ui/core'
import { styles } from '../Styles'

interface IProps extends WithStyles<typeof styles> {
  room: IRoomState
  game: IGameState
  initGame: (playerNames: string[], turnIdxs: number[],
    currentTurnIdx: number, dealerIdx: number) => void
}

export class CardRearrangeUpdate {
  static cards: Card[];
  static toUpdate: boolean = false
  static set(cards: Card[]) {
    this.cards = cards
  }
}

class Game extends Component<IProps> {
  public currentPlayerName(): string {
    const { game, room } = this.props
    let player = room.players.find(p => (p.turnIdx == game.currentTurnIdx))
    return player ? player.name : "No person"
  }
  public dealerName(): string {
    const { game, room } = this.props
    let player = room.players.find(p => (p.turnIdx == game.dealerIdx))
    return player ? player.name : "No dealer"
  }
  public currentPlayerHand(): Card[] {
    const { game, room } = this.props
    let player = room.players.find(p => (p.turnIdx == game.currentTurnIdx))
    return player ? player.hand : []
  }

  public componentDidMount(): void {
    let playerNames: string[] =
      ['Jivraj', 'Shanta', 'Nikesh', 'Nitin', 'Mikey']
    let turnIdxs = [1, 3, 2, 4, 0]
    let [currentTurnIdx, dealerIdx] = [1, 2]
    this.props.initGame(playerNames, turnIdxs, currentTurnIdx, dealerIdx) 
  }

  public render(): JSX.Element {
    const { classes, room, game } = this.props
    return (
      <div style={{ backgroundColor: "lightGrey" }}>
        <Grid container className={classes.gameState} >
          <Grid item xs={4}>
            Dealer: {this.dealerName()}
          </Grid>
          <Grid item xs={4}>
            Current Player: {this.currentPlayerName()}
          </Grid>
          <Grid item xs={4}>
            Deck: {game.drawDeck.length} cards
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
                {player.name}
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
}

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
  game: state.game,
})

export default connect(mapStateToProps, {
  initGame
})(withStyles(styles)(Game))
