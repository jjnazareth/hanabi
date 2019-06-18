import { Action } from 'redux';
import { Player, Card } from '../../globalTypes'

export enum GameActionNames {
    SET_CURRENT_TURN = 'SET_CURRENT_TURN',
    SET_NEXT_TURN = 'SET_NEXT_TURN',
    SET_DEALER = 'SET_DEALER',
    ADD_TO_DISCARD_PILE = 'ADD_TO_DISCARD_PILE'
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
export type AddToDiscardPile = Action<GameActionNames.ADD_TO_DISCARD_PILE> & {
    card: Card 
}

export type GameAction = SetCurrentTurnIdx | SetNextTurnIdx 
    | SetDealerIdx | AddToDiscardPile