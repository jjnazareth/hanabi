import { Action } from "redux"
import { Card, Player } from "../../globalTypes"

export enum RoomActionNames {
  LOGIN_PLAYER = "LOGIN_PLAYER",
  ADD_PLAYER = "ADD_PLAYER",
  SEAT_PLAYERS = "SEAT_PLAYERS",
  INIT_HAND = "INIT_HAND",
  REMOVE_CARD_FROM_HAND = "REMOVE_CARD_FROM_HAND",
  ADD_CARD_TO_HAND = "ADD_CARD_TO_HAND"
}
export type LoginPlayer = Action<RoomActionNames.LOGIN_PLAYER> & {
  name: string
}
export type AddPlayer = Action<RoomActionNames.ADD_PLAYER> & {
  name: string
}

export type InitHand = Action<RoomActionNames.INIT_HAND> & {
  turnIdx: number
  cards: Card[]
}
export type SeatPlayers = Action<RoomActionNames.SEAT_PLAYERS> & {
  turnIdxs: number[]
}

export type RemoveCardFromHand = Action<
  RoomActionNames.REMOVE_CARD_FROM_HAND
> & {
  player: Player
  card: Card
}

export type AddCardToHand = Action<RoomActionNames.ADD_CARD_TO_HAND> & {
  player: Player
  card: Card
}

export type RoomAction =
  | LoginPlayer
  | AddPlayer
  | InitHand
  | SeatPlayers
  | RemoveCardFromHand
  | AddCardToHand
