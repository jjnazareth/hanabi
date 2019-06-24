
import { GameActionNames } from './game.actions.type'
import { Card } from '../../globalTypes'

// ---------------- action creators -----------------------
export function setCurrentTurnIdx(idx: number) {
  return {
    type: GameActionNames.SET_CURRENT_TURN,
    currentTurnIdx: idx
  }
}
export function setNextTurnIdx(numPlayers: number) {
  return {
    type: GameActionNames.SET_NEXT_TURN,
    numPlayers: numPlayers
  }
}
export function addCardToDiscardPile(card: Card) {
  return {
    type: GameActionNames.ADD_CARD_TO_DISCARD_PILE,
    card: card
  }
}

export function addCardToBuildPile (card: Card) {
  return {
    type: GameActionNames.ADD_CARD_TO_BUILD_PILE,
    card: card
  }  
}

export function removeCardFromDeck (deck : Card[]) {
  return {
    type: GameActionNames.REMOVE_CARD_FROM_DECK,
    deck: deck
  }  
}




