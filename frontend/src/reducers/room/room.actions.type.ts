import { Action } from 'redux';
import { Card } from '../../globalTypes'

export enum RoomActionNames {
    ADD_PLAYER = 'ADD_PLAYER',
    SEAT_PLAYERS = 'SEAT_PLAYERS',
    INIT_HAND = 'INIT_HAND',
    ARRANGE_CARDS = 'ARRANGE_CARDS'
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

export type ArrangeCards = Action<RoomActionNames.ARRANGE_CARDS> & {
    turnIdx: number,
    cards: Card[]
}

export type RoomAction = AddPlayer | InitHand | SeatPlayers | ArrangeCards


