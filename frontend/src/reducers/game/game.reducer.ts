
import { Action } from 'redux';

import { GameAction, GameActionNames } from './game.actions.type'
import { Card } from '../../globalTypes'

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
    currentTurnIdx: -1,
}

export default function (state = initialState, action: GameAction) {
    switch (action.type) {
        case GameActionNames.SET_CURRENT_TURN:
            return{
                ...state,
                currentTurnIdx: action.currentTurnIdx
            }
            
        default:
            return state

    }
}
