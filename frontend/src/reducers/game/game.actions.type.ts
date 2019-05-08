import { Action } from 'redux';
import { Card } from '../../globalTypes'

export type Game = {
    drawDeck : Card[]
    discards : Card[]
    buildPile : Card[]
    currentTurnIdx : number
}

export enum GameActionNames {
    DEAL = 'DEAL',
    SET_CURRENT_TURN = 'SET_CURRENT_TURN'
}
export type SetCurrentTurnIdx = Action<GameActionNames.SET_CURRENT_TURN> & {
    currentTurnIdx: number 
}
export type Deal = Action<GameActionNames.DEAL> 

export type GameAction = SetCurrentTurnIdx | Deal
