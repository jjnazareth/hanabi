import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import roomReducer, { IRoomState } from '../reducers/room/room.reducer'

import { Card } from '../globalTypes'

interface IProps {
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

    public componentWillMount() {

    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div>
                    Current Player: {this.currentPlayerName()}
                    &nbsp; &nbsp;
                    Dealer: {this.dealerName()} 
                    {this.props.room.players.map((p) =>
                        <div  key={p.playerId}>
                            <br />
                            {p.name}
                            {p.hand.map(c =>
                                <span style= {{color: 'green'}} key={c.idx}>
                                    ,{c.idx} {c.colour} {c.rank}
                                </span>
                            )}
                        </div>

                    )}


                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room,
    game: state.game,

})


export default connect(mapStateToProps, {

})(Game)
