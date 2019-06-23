import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Player } from '../globalTypes'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'

import { initHand } from '../reducers/room/room.actions'
import { initPack } from '../reducers/pack/pack.actions'
import { initDeck } from '../reducers/game/game.actions'
import Table from './cards/Table'
import Hand from './cards/Hand'

import 'typeface-roboto'
import { Grid, Paper, WithStyles, Typography, withStyles } from '@material-ui/core'
import { styles } from '../Styles'


interface IProps extends WithStyles<typeof styles> {
  room: IRoomState
  game: IGameState
  initHand: (turnIdx: number, cards: Card[]) => void
  initDeck: (cards: Card[]) => void
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
  private numCardsInHand = (numPlayers: number) => (
    numPlayers < 4 ? 5 : 4
  )
  private deal = (pack: Card[], players: Player[], dealerIdx: number) => {
    let numPlayers = players.length
    const CARDS_IN_HAND = this.numCardsInHand(numPlayers)
    let arr = Array.from(Array(CARDS_IN_HAND).keys())
      .map(i => i * numPlayers) // 0,5,10,15,20 etc

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
    const { room, game, dealerIdx, initDeck } = this.props
    let pack = initPack()
    this.deal(pack, room.players, dealerIdx)
    let cardsDealt = room.players.length * this.numCardsInHand(room.players.length)
    initDeck(pack.slice(cardsDealt))
  }

  public render(): JSX.Element {
    const { classes, game, room, } = this.props
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
            {room.players.sort((p, q) => p.turnIdx - q.turnIdx).map((player, i) =>
              <div key={i} className={classes.background} >
                {player.name}
                <Hand holder={player} isTurn={game.currentTurnIdx == player.turnIdx} />
              </div>
            )}
          </Grid>
          {/* <Grid item className={classes.deck}>
            <Grid container justify="center" alignItems="center" direction="column">
              <Paper className={classes.card}
                style={{ top: 100,  }}>
                  <Typography variant="h3" align="center" className= {classes.cardDeck}>
                    {32}
                  </Typography>
              </Paper>
              <Paper className={classes.card}
                style={{ top: 150,  }}>
                  <Typography variant="h3" align="center" className= {classes.cardDeck}>
                    {3}
                  </Typography>
              </Paper>
            </Grid>

          </Grid>
 */}
          <Grid item xs={7} className={classes.background}>
            <Table />
          </Grid>
        </Grid>
      </div>
    )
  }
}
/* 

  <Grid container direction="column" alignContent="center" justify="space-between"
    style={{ backgroundColor: "blue" }}>
    <Grid item> 

    
  </Grid>
</Grid>
*/

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
  game: state.game,
})

export default connect(mapStateToProps, {
  initHand,
  initDeck
})(withStyles(styles)(Game))
