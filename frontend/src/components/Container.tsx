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

    public deal(pack: Card[], players: Player[], dealerIdx : number) {
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
    public componentWillMount(): void {
    
        let playerNames: string[] =
            ['Shanta', 'Jivraj', 'Nikesh', 'Nitin', 'Mikey']
        this.props.initialisePlayers(playerNames)
        this.props.initSeats([1, 3, 2, 4, 0])
        this.props.initPack()

        let turnIdx = 2
        this.props.initGame(turnIdx)
    
        this.deal(store.getState().pack.pack, store.getState().room.players, 2)
        console.log (this.props.pack.pack)
    }


    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div>
                    {/* <ul>
                        {this.props.pack.pack.map((c, idx) =>
                            <div>
                               <div key= {c.idx}>
                                    {console.log(c)}
                                    {c.idx} {c.colour} {c.rank}
                                </div>
                            </div>
                        )}
                    </ul> */}
                    <ul>
                        { console.log (this.props.room.players)}
{/* 
                        {this.props.room.players[0].hand.map((c, idx) =>               
                               <div key= {idx}>
                                    {console.log(c)}
                                    {c.idx} {c.colour} {c.rank}
                                </div>
                        )}
  */}                       
                    </ul>
                    <Room></Room>
                    <Game></Game>
                    <Pack></Pack>

                </div>
            </React.Fragment>
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
