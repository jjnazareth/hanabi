import React, { Component } from 'react'
import { connect } from 'react-redux'
import Room from './Room'
import Pack from './Pack'
import Game from './Game'
import { initialisePlayers, initSeats, initHand } from '../reducers/room/room.actions'
import { initPack } from '../reducers/pack/pack.actions'
import { initGame } from '../reducers/game/game.actions'
import { IGlobalState } from '../reducers'
import { IRoomState } from '../reducers/room/room.reducer'
import { IPackState } from '../reducers/pack/pack.reducer'
import { IGameState } from '../reducers/game/game.reducer'
import { Card, Player } from '../globalTypes'
import store from '../store'

interface IProps {
    initialisePlayers: (players: string[]) => void
    initSeats: (turnIdxs: number[]) => void
    initPack: () => void
    initHand: (turnIdx: number, cards: Card[]) => void
    initGame: (currentTurnIdx: number) => void
    room: IRoomState
    pack: IPackState
    game: IGameState
}

class Container extends Component<IProps> {

    public deal(pack : Card[], players: Player[]) {
        const CARDS_IN_HAND: number =  players.length < 4? 5 : 4
        //let players = store.getState().room.players
        let arr = Array.from(Array(CARDS_IN_HAND).keys())
            .map(i => i * players.length) // 0,5,10,15,20 etc 
        let dealerIdx = 2
        
        players.forEach(p => {
            let handIdx = (p.turnIdx- dealerIdx) < 0 ?
                p.turnIdx - dealerIdx + players.length : p.turnIdx - dealerIdx
           
            // dealer deals first to himself
            let cards = arr.map(i => pack[i + handIdx])
            this.props.initHand(p.turnIdx, cards)
        })
        console.log(store.getState().room.players)
    }
    constructor (props : IProps) {
        super(props)
    }
    public componentWillMount(): void {
        let playerNames: string[] =
            ['Shanta', 'Jivraj', 'Nikesh', 'Nitin', 'Mikey']
        this.props.initialisePlayers(playerNames)
        this.props.initSeats([1, 3, 2, 4, 0])
        this.props.initPack()

        let turnIdx = 2
        this.props.initGame(turnIdx)
        this.deal(store.getState().pack.pack, store.getState().room.players)
        //this.deal(this.props.pack.pack, this.props.room.players)
    }

    public render(): JSX.Element {
        return (
            <div>
                {this.props.pack.pack.map(c => {
                   {c.idx} {c.colour} {c.rank} <br/>
                })}
                <Room></Room>
                <Game></Game>
                <Pack></Pack>

            </div>

        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room,
    pack: state.pack,
    game: state.game
})


export default connect(mapStateToProps, {
    initialisePlayers,
    initSeats,
    initPack,
    initGame,
    initHand,
})(Container)
