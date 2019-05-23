import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import roomReducer, { IRoomState } from '../reducers/room/room.reducer'

import CardPlace from '../screens/CardPlace'
import CardDisplay from '../screens/CardDisplay'
import { Card, CardColour, CardRank } from '../globalTypes'
import { setCurrentTurnIdx } from '../reducers/game/game.actions';
import Hand from '../screens/Hand'

const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

interface IProps {
    game: IGameState
    room: IRoomState
}

class Game extends Component<IProps> {

    public currentPlayerName(): string {
        const { game, room } = this.props
        let player = room.players.find(p => (p.turnIdx == game.currentTurnIdx))
        return player ? player.name : "No person"
    }
    public dealerName(): string {
        const { game, room } = this.props
        let player = room.players.find(p => (p.turnIdx == game.dealerIdx))
        return player ? player.name : "No dealer"
    }
    public currentPlayerHand(): Card[] {
        const { game, room } = this.props
        let player = room.players.find(p => (p.turnIdx == game.currentTurnIdx))
        return player ? player.hand : []
    }

    public componentWillMount() {

    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <div>
                    Current Player: {this.currentPlayerName()}
                    &nbsp; &nbsp;
                    Dealer: {this.dealerName()}
                        <Hand/>          

                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    room: state.room,
    game: state.game,

})


export default connect(mapStateToProps, {

})(Game)
