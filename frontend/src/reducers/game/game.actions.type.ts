import { Action } from 'redux';
import { Player, Card } from '../../globalTypes'

export type Game = {
    drawDeck : Card[]
    discards : Card[]
    buildPile : Card[]
    currentTurnIdx : number
    dealerIdx : number
}

export enum GameActionNames {
    SET_CURRENT_TURN = 'SET_CURRENT_TURN',
    DEAL = 'DEAL'
}
export type SetCurrentTurnIdx = Action<GameActionNames.SET_CURRENT_TURN> & {
    currentTurnIdx: number 
}

export type Deal = Action<GameActionNames.DEAL> & {
    pack : Card[],
    players : Player[],
    dealerIdx: number 
}


export type GameAction = SetCurrentTurnIdx | Deal
