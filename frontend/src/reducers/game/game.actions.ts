import { GameActionNames } from "./game.actions.type"
import { Card, PlayerHint } from "../../globalTypes"

// ---------------- action creators -----------------------

function initialiseCardGame() {
  return {
    type: GameActionNames.DESTRUCT_CARD_GAME
  }
}

function setCurrentTurnIdx(idx: number) {
  return {
    type: GameActionNames.SET_CURRENT_TURN,
    currentTurnIdx: idx
  }
}
function setNextTurnIdx(numPlayers: number) {
  return {
    type: GameActionNames.SET_NEXT_TURN,
    numPlayers: numPlayers
  }
}
function addCardToDiscardPile(card: Card) {
  return {
    type: GameActionNames.ADD_CARD_TO_DISCARD_PILE,
    card: card
  }
}

function addCardToBuildPile(card: Card) {
  return {
    type: GameActionNames.ADD_CARD_TO_BUILD_PILE,
    card: card
  }
}

function removeCardFromDeck(deck: Card[]) {
  return {
    type: GameActionNames.REMOVE_CARD_FROM_DECK,
    deck: deck
  }
}

function giveHint(playerHint: PlayerHint) {
  return {
    type: GameActionNames.GIVE_HINT,
    playerHint: playerHint
  }
}
