import { Action } from 'redux';
import { Card } from '../pack/pack.actions.type'

export type AddPlayer = Action<RoomActionNames.ADD_PLAYER> &  {
    player: Player
}

export type SetTurnIdx = Action<RoomActionNames.SET_TURN_IDX> & {
    player: Player,
    turnIdx : number
}

export type SetCurrentPlayer = Action<RoomActionNames.SET_CURRENT_PLAYER> & {
    currentPlayerNo: number 
}

export type Player = {
    name : string,
    turnIdx : number | null,
    hand : Card[] | null   
}

export type RoomAction = AddPlayer | SetTurnIdx | SetCurrentPlayer ;

export enum RoomActionNames {
    ADD_PLAYER = 'ADD_PLAYER',
    SET_TURN_IDX = 'SET_TURN_IDX',
    SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER'
}
