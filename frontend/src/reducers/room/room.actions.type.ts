import { Action } from "redux"
import { Card, Player, Member } from "../../globalTypes"

export enum RoomActionNames {
  LOGIN_PLAYER = "LOGIN_PLAYER",
  REMOVE_ALL_PLAYERS = "REMOVE_ALL_PLAYERS",
  ADD_PLAYER = "ADD_PLAYER",
  SEAT_PLAYERS = "SEAT_PLAYERS",
  SEAT_MEMBERS = "SEAT_MEMBERS",
  INIT_HAND = "INIT_HAND",
  ADD_CARD_TO_HAND = "ADD_CARD_TO_HAND",
  REMOVE_CARD_FROM_HAND = "REMOVE_CARD_FROM_HAND"
}

export type SeatMembers = Action<RoomActionNames.SEAT_MEMBERS> & {
  members: Member[]
}

export type LoginPlayer = Action<RoomActionNames.LOGIN_PLAYER> & {
  name: string
}

export type RemoveAllPlayers = Action<RoomActionNames.REMOVE_ALL_PLAYERS>
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

export type AddCardToHand = Action<RoomActionNames.ADD_CARD_TO_HAND> & {
  player: Player
  card: Card
}

export type RemoveCardFromHand = Action<
  RoomActionNames.REMOVE_CARD_FROM_HAND
> & {
  player: Player
  card: Card
}

export type RoomAction =
  | SeatMembers
  | AddPlayer
  | InitHand
  | SeatPlayers
  | RemoveCardFromHand
  | AddCardToHand
  | LoginPlayer
  | RemoveAllPlayers
