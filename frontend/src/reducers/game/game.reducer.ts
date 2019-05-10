
import { Action } from 'redux';

import { GameAction, GameActionNames } from './game.actions.type'
import { Card, Player } from '../../globalTypes'
import { setTurnIdx, addPlayer } from '../room/room.actions'
import store from '../../store'

export interface IGameState {
    drawDeck: Card[]
    discards: Card[]
    buildPile: Card[]
    currentTurnIdx: number
}

const initialState: IGameState = {
    drawDeck: [],
    discards: [],
    buildPile: [],
    currentTurnIdx: 0
}

export default function (state = initialState, action: GameAction) {
    switch (action.type) {
        case GameActionNames.DEAL:
            return state
        case GameActionNames.SET_CURRENT_TURN:
            return {
                ...state,
                currentTurnIdx: action.currentTurnIdx
            }
        default:
            return state

    }
}
