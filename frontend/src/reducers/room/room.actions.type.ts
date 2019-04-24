import { Action } from 'redux';

export type AddPlayer = Action<RoomActionNames.ADD_PLAYER> & {
    name: string
}

export type RoomAction = AddPlayer;

export enum RoomActionNames {
    ADD_PLAYER = 'ADD_PLAYER'
}
