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
    initGame: (currentTurnIdx: number, dealerIdx: number) => void
    room: IRoomState
    pack: IPackState
    game: IGameState
    
}



class Container extends Component<IProps> {

    private deal = (pack: Card[], players: Player[], dealerIdx: number) => {
        const CARDS_IN_HAND: number = players.length < 4 ? 5 : 4
        let numPlayers = players.length
        let arr = Array.from(Array(CARDS_IN_HAND).keys())
            .map(i => i * numPlayers) // 0,5,10,15,20 etc 

        players.forEach(p => {
            let handIdx = (p.turnIdx - dealerIdx - 1 + numPlayers) % numPlayers
            // dealer deals last to himself
            let cards = arr.map(i => pack[i + handIdx])
            this.props.initHand(p.turnIdx, cards)
        })
    }

    constructor(props: IProps) {
        super(props)
    }
    public componentDidMount(): void {
        const { room, pack, game } = this.props
        let playerNames: string[] =
            ['Jivraj', 'Shanta', 'Nikesh', 'Nitin', 'Mikey']
        this.props.initialisePlayers(playerNames)
        console.log(this.props.room)
        let [turnIdx, dealerIdx] = [0, 2]
        this.props.initGame(turnIdx, dealerIdx)
        this.props.initSeats([1, 3, 2, 4, 0])
        this.props.initPack()

        this.deal(store.getState().pack.pack, store.getState().room.players, game.dealerIdx)
        //this.deal(this.props.pack.pack, this.props.room.players, dealerIdx) 
    }

    public componentDidUpdate(): void {
    }
    public render(): JSX.Element {
        return (
            <React.Fragment>          
                    <div>
                        <Room></Room>
                        {/*  <Pack></Pack> */}
                        <Game></Game>
                    </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room,
    pack: state.pack,
    game: state.game,
})


export default connect(mapStateToProps, {
    initialisePlayers,
    initSeats,
    initPack,
    initGame,
    initHand,

})(Container)
