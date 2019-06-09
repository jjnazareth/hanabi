import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IRoomState } from '../reducers/room/room.reducer'
import { Card, Player } from '../globalTypes'

import { initialisePlayers, initSeats, initHand } from '../reducers/room/room.actions'
interface IProps {
    room: IRoomState
    initialisePlayers: (players: string[]) => void
    initSeats: (turnIdxs: number[]) => void  
}

class Room extends Component<IProps> {
    public componentWillMount(): void {
        let playerNames: string[] =
            ['Jivraj', 'Shanta', 'Nikesh', 'Nitin', 'Mikey']
        this.props.initialisePlayers(playerNames)
        this.props.initSeats([1, 3, 2, 4, 0])
    }
    public render(): JSX.Element {
        const { room } = this.props
        return (
            <React.Fragment>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room,
    pack: state.pack
})

export default connect(mapStateToProps, {
    initialisePlayers,
    initSeats,
    
})(Room)
