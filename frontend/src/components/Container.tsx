import React, { Component } from 'react'
import { connect } from 'react-redux'
import Room from './Room'
import Pack from './Pack'
import { initialisePlayers } from '../reducers/room/room.actions'
import { initPack } from '../reducers/pack/pack.actions'

class Container extends Component<IProps> {
    public componentWillMount(): void {
        this.props.initialisePlayers()
        this.props.initPack()
    }

    public render(): JSX.Element {
        return (
            <div>
                <Room></Room>
                <Pack></Pack>

            </div>
            
        )
    }
}


interface IProps {
    initialisePlayers: () => void
    initPack: () => void
}

export default connect(null,
    {
        initialisePlayers,
        initPack
    })(Container)
