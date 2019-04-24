import React, { Component } from 'react'
import {connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IRoomState } from '../reducers/room/room.reducer'

class Room extends Component<IProps> {
    public render(): JSX.Element {
        const {room} = this.props
        return (
            <div>{room.players.length > 0 ? room.players[0] : 'Empty'}</div>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room
})

interface IProps {
    room: IRoomState
}

export default connect(mapStateToProps)(Room);
