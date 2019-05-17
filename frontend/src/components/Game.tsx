import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IGlobalState } from '../reducers'
import { IGameState } from '../reducers/game/game.reducer'
import roomReducer, { IRoomState } from '../reducers/room/room.reducer'

import CardPlace from '../screens/CardPlace'
import CardDisplay from '../screens/CardDisplay'
import { Card, CardColour, CardRank } from '../globalTypes'
import { setCurrentTurnIdx } from '../reducers/game/game.actions';

const rowStyle: React.CSSProperties = { overflow: 'hidden', clear: 'both' }

interface IProps {
    game: IGameState
    room: IRoomState
}


const style: React.CSSProperties = {
    height: '12rem',
    width: '6rem',
    border: '1px solid gray',
    backgroundColor: 'red',
    padding: '0.5rem 0.5rem',
    marginRight: '0.5rem',
    marginBottom: '1.0rem',
    cursor: 'move',
    float: 'left',
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
                    {this.props.room.players.map((p) =>
                        <div key={p.playerId}>
                            <br />
                            <div style={rowStyle}>
                                {p.name}
                                <br/>
                                {p.hand.map(c =>
                                    <CardDisplay card={c} ></CardDisplay>
                                )}
                            </div>
                        </div>

                    )}

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
