import { Action } from 'redux';
import { Card } from '../../globalTypes'

export enum RoomActionNames {
    ADD_PLAYER = 'ADD_PLAYER',
    SET_TURN_IDX = 'SET_TURN_IDX',
    DEAL_HANDS = 'DEAL_HANDS'
}
export type AddPlayer = Action<RoomActionNames.ADD_PLAYER> &  {
    name: string
}

export type SetTurnIdx = Action<RoomActionNames.SET_TURN_IDX> & {
    playerId : number
    turnIdx : number
}
export type DealHands = Action<RoomActionNames.DEAL_HANDS> & {
    pack : Card[]
}


export type RoomAction = AddPlayer | SetTurnIdx | DealHands


