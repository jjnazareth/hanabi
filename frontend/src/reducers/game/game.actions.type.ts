import { Action } from 'redux';
import { Player, Card } from '../../globalTypes'

export enum GameActionNames {
    SET_CURRENT_TURN = 'SET_CURRENT_TURN',
    SET_NEXT_TURN = 'SET_NEXT_TURN',
    SET_DEALER = 'SET_DEALER',
    DEAL = 'DEAL'
}
export type SetCurrentTurnIdx = Action<GameActionNames.SET_CURRENT_TURN> & {
    currentTurnIdx: number 
}
export type SetNextTurnIdx = Action<GameActionNames.SET_NEXT_TURN> & {
    numPlayers: number
}
export type SetDealerIdx = Action<GameActionNames.SET_DEALER> & {
    dealerIdx: number 
}

export type Deal = Action<GameActionNames.DEAL> & {
    pack : Card[],
    players : Player[],
    dealerIdx: number 
}


export type GameAction = SetCurrentTurnIdx | SetNextTurnIdx | SetDealerIdx | Deal 
