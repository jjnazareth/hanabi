import React, { Component } from 'react'
import { connect } from 'react-redux'
import Room from './Room'
import Pack from './Pack'
import Game from './Game'
import { initialisePlayers } from '../reducers/room/room.actions'
import { initPack } from '../reducers/pack/pack.actions'
import { initGame } from '../reducers/game/game.actions'
import { IGlobalState } from '../reducers'

interface IProps {
    initialisePlayers: (players : [string, number][]) =>  void
    initPack: () => void
    initGame: () => void
}

class Container extends Component<IProps> {
    
    public componentWillMount(): void {
        let  players : [string, number][] =  
            [['Shanta',3], ['Jivraj',1], ['Nikesh',2], ['Nitin',0], ['Mikey',4]]  
        this.props.initialisePlayers(players)
        this.props.initPack()
        this.props.initGame()
    }

    public render(): JSX.Element {
        return (
            <div>
                <Room></Room>
                <Game></Game>
                {<Pack></Pack>}


            </div>

        )
    }
}




export default connect(null, {
    initialisePlayers,
    initPack,
    initGame
})(Container)
