import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IRoomState } from '../reducers/room/room.reducer'

interface IProps {
    room: IRoomState
}

class Room extends Component<IProps> {

    public render(): JSX.Element {
        const { room } = this.props
        return (
            <React.Fragment>
                Room with turn player id, name and turn indexes
                <ul>
                    {room.players.map((p, idx) =>
                        <li key={idx}>
                           {p.playerId} {p.name} {p.turnIdx}

                        </li> 
                    )}
                </ul>           
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room
})


export default connect(mapStateToProps, {
    //addPlayer,
    //setTurnIdx
   
})(Room)
