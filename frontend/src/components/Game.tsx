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
    public render(): JSX.Element {
        const { game, room } = this.props

        return (
            <React.Fragment>
                <div>
                    Current Player: {room.players[game.currentTurnIdx].name}
                    <ul>
                        {room.players.map((p, idx) =>
                            <li key={idx}>
                                {p.name} {p.playerId} {p.turnIdx}
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
