import { Action } from 'redux';
import { Card } from '../../globalTypes'

export type Game = {
    drawDeck : Card[]
    discards : Card[]
    buildPile : Card[]
    currentTurnIdx : number
    dealerIdx : number
}

export enum GameActionNames {
    SET_CURRENT_TURN = 'SET_CURRENT_TURN'
}
export type SetCurrentTurnIdx = Action<GameActionNames.SET_CURRENT_TURN> & {
    currentTurnIdx: number 
}

export type GameAction = SetCurrentTurnIdx 
