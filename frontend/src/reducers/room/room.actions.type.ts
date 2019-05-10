import { Action } from 'redux';
import { Player } from '../../globalTypes'

export enum RoomActionNames {
    ADD_PLAYER = 'ADD_PLAYER',
    SET_TURN_IDX = 'SET_TURN_IDX',
 
}
export type AddPlayer = Action<RoomActionNames.ADD_PLAYER> &  {
    name: string
}

export type SetTurnIdx = Action<RoomActionNames.SET_TURN_IDX> & {
    playerId : number
    turnIdx : number
}


export type RoomAction = AddPlayer | SetTurnIdx 


