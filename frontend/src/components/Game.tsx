import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../globalTypes'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'

import { initHand } from '../reducers/room/room.actions'
import { initPack } from '../reducers/pack/pack.actions'
import Table from '../screens/Table'
import Hand from '../screens/Hand'

import 'typeface-roboto'
import { Grid, WithStyles, withStyles } from '@material-ui/core'
import { styles } from '../Styles'


interface IProps extends WithStyles<typeof styles> {
  room: IRoomState
  game: IGameState
  initHand: (turnIdx: number, cards: Card[]) => void
  dealerIdx: number
}

export class CardRearrangeUpdate {
  static cards: Card[];
  static toUpdate: boolean = false
  static set(cards: Card[]) {
    this.cards = cards
  }
}

class Game extends Component<IProps> {
  private deal = (pack: Card[], players: Player[], dealerIdx: number) => {
    const CARDS_IN_HAND: number = players.length < 4 ? 5 : 4
    let numPlayers = players.length
    let arr = Array.from(Array(CARDS_IN_HAND).keys())
      .map(i => i * numPlayers) // 0,5,10,15,20 etc 
      .map(i => i + 20)
      .reverse() //leave 20 cards for no good reason
    players.forEach(p => {
      let handIdx = (p.turnIdx - dealerIdx - 1 + numPlayers) % numPlayers
      // dealer deals last to himself
      let cards = arr.map(i => pack[i + handIdx])
      this.props.initHand(p.turnIdx, cards)
    })
  }

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
    let pack = initPack()
    this.deal(pack, this.props.room.players, this.props.dealerIdx)
  }
  public render(): JSX.Element {
    const { classes, game, room, } = this.props

    return (
      <React.Fragment>
        <Grid container className={classes.gameState} >
          <Grid item xs={4}>
            Current Player: {this.currentPlayerName()}
          </Grid>
          <Grid item xs={8}>
            Dealer: {this.dealerName()}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={5}>
            {room.players.sort((p, q) => p.turnIdx - q.turnIdx).map((player, i) =>
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

      </React.Fragment >
    )
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
  game: state.game,
})

export default connect(mapStateToProps, {
  initHand
})(withStyles(styles)(Game))
