import { Action } from 'redux';
import { Card } from '../../globalTypes'

export enum GameActionNames {
    SET_CURRENT_TURN = 'SET_CURRENT_TURN',
    SET_NEXT_TURN = 'SET_NEXT_TURN',
    SET_DEALER = 'SET_DEALER',
    ADD_TO_DISCARD_PILE = 'ADD_TO_DISCARD_PILE',
    ADD_TO_BUILD_PILE = 'ADD_TO_BUILD_PILE',
    INIT_DECK = 'INIT_DECK',
    REMOVE_CARD_FROM_DECK = 'PICK_CARD_FROM_DECK'
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
export type InitDeck = Action<GameActionNames.INIT_DECK> & {
    cards: Card[] 
}

export type AddToDiscardPile = Action<GameActionNames.ADD_TO_DISCARD_PILE> & {
    card: Card 
}

export type AddToBuildPile = Action<GameActionNames.ADD_TO_BUILD_PILE> & {
    card: Card 
}

export type RemoveCardFromDeck = Action<GameActionNames.REMOVE_CARD_FROM_DECK> 


export type GameAction = SetCurrentTurnIdx | SetNextTurnIdx 
    | SetDealerIdx | InitDeck | AddToDiscardPile | AddToBuildPile | RemoveCardFromDeck