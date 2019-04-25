import { Action } from 'redux';

export type AddPlayer = Action<RoomActionNames.ADD_PLAYER> &  {
    name: string
}

export type SetTurnIdx = Action<RoomActionNames.SET_TURN_IDX> & {
    idx: number
}

export type SetCurrentPlayer = Action<RoomActionNames.SET_CURRENT_PLAYER> & {
    idx: number
}

export type RoomAction = AddPlayer | SetTurnIdx | SetCurrentPlayer ;

export enum RoomActionNames {
    ADD_PLAYER = 'ADD_PLAYER',
    SET_TURN_IDX = 'SET_TURN_IDX',
    SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER'
}
