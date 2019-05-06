import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IRoomState } from '../reducers/room/room.reducer'
import { addPlayer, setTurnIdx, setCurrentPlayer } from '../reducers/room/room.actions'
import { RoomAction } from '../reducers/room/room.actions.type';

class Room extends Component<IProps> {
    public render(): JSX.Element {
        const { room } = this.props
        return (
            <React.Fragment>
                <ul>
                    {room.players.map((player, idx) => (
                        <li key={player.turnIdx ? player.turnIdx : 0}>
                            {room.currentPlayerNo === idx ?
                                (<b>{player.name}</b>) :
                                player.name
                            }
                        </li>
                    ))}
                </ul>
                <div>
                     Current Player: {room.players[room.currentPlayerNo].name}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room
})

const mapDispatchToProps = (dispatch: Dispatch<RoomAction>) => {
    return {
        addPlayer: (playerName: string) => addPlayer(playerName),
        setTurnIdx: (idx: number) => setTurnIdx(idx),
        setCurrentPlayer: (idx: number) => setCurrentPlayer(idx)
    }
}

interface IProps {
    room: IRoomState
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
