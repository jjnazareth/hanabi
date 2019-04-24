import React, { Component } from 'react'
import { connect } from 'react-redux'
import Room from './Room'
import { initialisePlayers } from '../reducers/room/room.actions'

class Container extends Component<IProps> {
    public componentWillMount(): void {
        console.log('About to init players')
        this.props.initialisePlayers()
    }

    public render(): JSX.Element {
        return (
            <Room></Room>
        )
    }
}

interface IProps {
    initialisePlayers: () => void
}

export default connect(null, { initialisePlayers })(Container)
