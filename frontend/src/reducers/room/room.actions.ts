import { RoomActionNames } from "./room.actions.type"
import { Card, Player, Member } from "../../globalTypes"

// ---------------- action creators -----------------------
function seatMembers(members: Member[]) {
  return {
    type: RoomActionNames.SEAT_MEMBERS,
    members: members
  }
}

function addPlayer(playerName: string) {
  return {
    type: RoomActionNames.ADD_PLAYER,
    name: playerName
  }
}

function removeAllPlayers() {
  return {
    type: RoomActionNames.REMOVE_ALL_PLAYERS
  }
}

function seatPlayers(idxs: number[]) {
  return {
    type: RoomActionNames.SEAT_PLAYERS,
    playerIds: idxs
  }
}

function addCardToHand(player: Player, card: Card) {
  return {
    type: RoomActionNames.ADD_CARD_TO_HAND,
    player: player,
    card: card
  }
}

function removeCardFromHand(player: Player, card: Card) {
  return {
    type: RoomActionNames.REMOVE_CARD_FROM_HAND,
    player: player,
    discard: card
  }
}
