import { Action } from 'redux';
import { Player, Card } from '../../globalTypes'

export enum GameActionNames {
    SET_CURRENT_TURN = 'SET_CURRENT_TURN',
    SET_NEXT_TURN = 'SET_NEXT_TURN',
    SET_DEALER = 'SET_DEALER',
    ARRANGE_CARDS = 'ARRANGE_CARDS'
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

export type ArrangeCards = Action<GameActionNames.ARRANGE_CARDS> & {
    playerId: number,
    cards: Card[]
}


export type GameAction = SetCurrentTurnIdx | SetNextTurnIdx 
    | SetDealerIdx | ArrangeCards 
