import { Action } from 'redux';
import { Card, Player } from '../../globalTypes'

export enum RoomActionNames {
    ADD_PLAYER = 'ADD_PLAYER',
    SEAT_PLAYERS = 'SEAT_PLAYERS',
    INIT_HAND = 'INIT_HAND',
    DISCARD = 'DISCARD'
}
export type AddPlayer = Action<RoomActionNames.ADD_PLAYER> &  {
    name: string
}

export type InitHand = Action<RoomActionNames.INIT_HAND> & {
    turnIdx : number,
    cards : Card[]
}
export type SeatPlayers = Action<RoomActionNames.SEAT_PLAYERS> & {
    turnIdxs : number[]
}

export type Discard = Action<RoomActionNames.DISCARD> & {
    player: Player,
    card: Card
}


export type RoomAction = AddPlayer | InitHand | SeatPlayers | Discard


