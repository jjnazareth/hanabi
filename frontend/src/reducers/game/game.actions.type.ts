import { Action } from 'redux';
import { Card, Player } from '../../globalTypes'

export enum GameActionNames {
    SET_CURRENT_TURN = 'SET_CURRENT_TURN',
    SET_NEXT_TURN = 'SET_NEXT_TURN',
    SET_DEALER = 'SET_DEALER',
    ADD_CARD_TO_DISCARD_PILE = 'ADD_CARD_TO_DISCARD_PILE',
    ADD_CARD_TO_BUILD_PILE = 'ADD_CARD_TO_BUILD_PILE',
    INIT_DECK = 'INIT_DECK',
    REMOVE_CARD_FROM_DECK = 'REMOVE_CARD_FROM_DECK'
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

export type AddCardToDiscardPile = Action<GameActionNames.ADD_CARD_TO_DISCARD_PILE> & {
    card: Card 
}

export type AddCardToBuildPile = Action<GameActionNames.ADD_CARD_TO_BUILD_PILE> & {
    card: Card 
}

export type RemoveCardFromDeck = Action<GameActionNames.REMOVE_CARD_FROM_DECK> & {
    deck: Card[]
}

export type GameAction = SetCurrentTurnIdx | SetNextTurnIdx 
    | SetDealerIdx | InitDeck
    | AddCardToDiscardPile | AddCardToBuildPile | RemoveCardFromDeck