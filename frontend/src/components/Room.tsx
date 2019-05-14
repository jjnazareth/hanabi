import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IRoomState } from '../reducers/room/room.reducer'
import { IPackState } from '../reducers/pack/pack.reducer'

import { initialisePlayers, initSeats, initHand } from '../reducers/room/room.actions'
import { initPack } from '../reducers/pack/pack.actions'
import { Card, Player} from '../globalTypes'

interface IProps {
    room: IRoomState
}

class Room extends Component<IProps> {
    
    public componentWillMount(): void {
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

})(Room)
