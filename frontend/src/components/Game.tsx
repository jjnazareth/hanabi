import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import { IRoomState } from '../reducers/room/room.reducer';
import { initGame } from '../reducers/game/game.actions'

interface IProps {
    game: IGameState
    room: IRoomState
}

class Game extends Component<IProps> {

    public currentPlayerName()  : string {
        const { game, room } = this.props
        let player =  room.players.find(p => (p.turnIdx == game.currentTurnIdx))
        return player? player.name : "No person"
    }

    public render(): JSX.Element {
        const { game, room } = this.props

        return (
            <React.Fragment>
                <div>
                    Current Player: {this.currentPlayerName()}
                    <ul>
                        {room.players[game.currentTurnIdx].hand.map((card, idx) =>
                            <li key = { idx } >
                                {card.idx} {card.colour} {card.rank} 
                            </li>
                        )}
                    </ul>

                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room,
    game: state.game
})


export default connect(mapStateToProps, {
    initGame
})(Game)
