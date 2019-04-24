import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IRoomState } from '../reducers/room/room.reducer'

class Room extends Component<IProps> {
    public render(): JSX.Element {
        const { room } = this.props
        return (
            <React.Fragment>
                <ul>
                    { room.players.map((name, idx) => (
                        <li key={ idx }>
                            { room.currentPlayerNo === idx ?
                                (<b>{ name }</b>) :
                                name
                            }
                        </li>
                    )) }
                </ul>
                <div>
                    Current Player: { room.players[room.turnIdx] }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room
})

interface IProps {
    room: IRoomState
}

export default connect(mapStateToProps)(Room)
