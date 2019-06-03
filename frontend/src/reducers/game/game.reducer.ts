
import { Action } from 'redux';

import { GameAction, GameActionNames } from './game.actions.type'
import { Card } from '../../globalTypes'

export interface IGameState {
    drawDeck: Card[]
    discards: Card[]
    buildPile: Card[]
    currentTurnIdx: number
    dealerIdx: number, 
}

const initialState: IGameState = {
    drawDeck: [],
    discards: [],
    buildPile: [],
    currentTurnIdx: -1,
    dealerIdx: -1
}

export default function (state = initialState, action: GameAction) {
    switch (action.type) {
        case GameActionNames.SET_CURRENT_TURN:
            return {
                ...state,
                currentTurnIdx: action.currentTurnIdx
            }
        case GameActionNames.SET_NEXT_TURN:
            return {
                ...state,
                currentTurnIdx : (state.currentTurnIdx + 1) % action.numPlayers
            }

        case GameActionNames.SET_DEALER:
            return {
                ...state,
                dealerIdx: action.dealerIdx
            }
        case GameActionNames.DEAL:
            return {
                ...state,

            }
        default:
            return state
    }
}
