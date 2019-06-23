import { Dispatch } from 'redux'
import {
  GameActionNames, SetCurrentTurnIdx, SetNextTurnIdx, SetDealerIdx,
  AddToDiscardPile, AddToBuildPile, InitDeck, RemoveCardFromDeck
} from './game.actions.type'
import { Card } from '../../globalTypes'

export const initGame = (currentTurnIdx: number, dealerIdx: number) =>
  (dispatch: Dispatch<SetCurrentTurnIdx | SetDealerIdx>) => {
    dispatch({
      type: GameActionNames.SET_CURRENT_TURN,
      currentTurnIdx: currentTurnIdx
    })
    dispatch({
      type: GameActionNames.SET_DEALER,
      dealerIdx: dealerIdx
    })
  }

export const setNextTurn = (numPlayers: number) =>
  (dispatch: Dispatch<SetNextTurnIdx>) => {
    dispatch({
      type: GameActionNames.SET_NEXT_TURN,
      numPlayers: numPlayers
    })
  }

export const addToDiscardPile = (card: Card) =>
  (dispatch: Dispatch<AddToDiscardPile>) => {
    dispatch({
      type: GameActionNames.ADD_TO_DISCARD_PILE,
      card: card
    })
  }

export const addToBuildPile = (card: Card) =>
  (dispatch: Dispatch<AddToBuildPile>) => {
    dispatch({
      type: GameActionNames.ADD_TO_BUILD_PILE,
      card: card
    })
  }

export const initDeck = (cards: Card[]) =>
  (dispatch: Dispatch<InitDeck>) => {
    dispatch({
      type: GameActionNames.INIT_DECK,
      cards: cards
    })
  }

export const removeCardFromDeck = () =>
  (dispatch: Dispatch<RemoveCardFromDeck>) => {
    dispatch({
      type: GameActionNames.REMOVE_CARD_FROM_DECK,
    })
  }

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



