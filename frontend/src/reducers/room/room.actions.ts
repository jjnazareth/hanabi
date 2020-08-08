import { RoomActionNames } from "./room.actions.type"
import { Card, Player } from "../../globalTypes"

// ---------------- action creators -----------------------

export function loginPlayer(playerName: string) {
  return {
    type: RoomActionNames.LOGIN_PLAYER,
    playerName: playerName
  }
}
export function addPlayer(playerName: string) {
  return {
    type: RoomActionNames.ADD_PLAYER,
    name: playerName
  }
}

export function removeAllPlayers() {
  return {
    type: RoomActionNames.REMOVE_ALL_PLAYERS
  }
}

export function seatPlayers(idxs: number[]) {
  return {
    type: RoomActionNames.SEAT_PLAYERS,
    playerIds: idxs
  }
}

export function addCardToHand(player: Player, card: Card) {
  return {
    type: RoomActionNames.ADD_CARD_TO_HAND,
    player: player,
    card: card
  }
}

export function removeCardFromHand(player: Player, card: Card) {
  return {
    type: RoomActionNames.REMOVE_CARD_FROM_HAND,
    player: player,
    discard: card
  }
}
