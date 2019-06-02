import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer'
import Discards from '../screens/Discards'
import BuildPile from '../screens/BuildPile'
import Table from '../screens/Table'
import { Card } from '../globalTypes'
import { setCurrentTurnIdx } from '../reducers/game/game.actions';
import Hand from '../screens/Hand'
import { Grid, WithStyles, Container } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'
import { withStyles } from '@material-ui/core'

interface IProps extends WithStyles<typeof styles> {
  game: IGameState
  room: IRoomState

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
  public render(): JSX.Element {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Grid container xs={12} className={classes.gameState} >
          <Grid item xs={4}>
            Current Player: {this.currentPlayerName()}
          </Grid>
          <Grid item xs={8}>
            Dealer: {this.dealerName()}
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={5}>
            {this.props.room.players.map((player, i) =>
              <div key={i} className={classes.background} >
                {player.name}
                <Hand holder={player.name} cards={player.hand} />
              </div>
            )}
          </Grid>
          <Grid container xs={7}  className={classes.background}>
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

export default connect(mapStateToProps, null)(withStyles(styles)(Game))
