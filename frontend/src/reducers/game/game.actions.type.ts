import { Action } from "redux"
import { Card, Player, PlayerHint } from "../../globalTypes"

export enum GameActionNames {
  DESTRUCT_CARD_GAME = "DESTRUCT_CARD_GAME",
  SET_CURRENT_TURN = "SET_CURRENT_TURN",
  SET_NEXT_TURN = "SET_NEXT_TURN",
  SET_DEALER = "SET_DEALER",
  ADD_CARD_TO_DISCARD_PILE = "ADD_CARD_TO_DISCARD_PILE",
  ADD_CARD_TO_BUILD_PILE = "ADD_CARD_TO_BUILD_PILE",
  INIT_DECK = "INIT_DECK",
  REMOVE_CARD_FROM_DECK = "REMOVE_CARD_FROM_DECK",
  GIVE_HINT = "GIVE_HINT"
}
export type DestructCardGame = Action<GameActionNames.DESTRUCT_CARD_GAME>

export type SetCurrentTurnIdx = Action<GameActionNames.SET_CURRENT_TURN> & {
  currentTurnIdx: number
}
export type SetNextTurnIdx = Action<GameActionNames.SET_NEXT_TURN> & {
  numPlayers: number
}
export type SetDealerIdx = Action<GameActionNames.SET_DEALER> & {
  dealerIdx: number
}

export type InitDeck = Action<GameActionNames.INIT_DECK> & {
  cards: Card[]
}

export type AddCardToDiscardPile = Action<
  GameActionNames.ADD_CARD_TO_DISCARD_PILE
> & { card: Card }

export type AddCardToBuildPile = Action<
  GameActionNames.ADD_CARD_TO_BUILD_PILE
> & {
  card: Card
}

export type RemoveCardFromDeck = Action<
  GameActionNames.REMOVE_CARD_FROM_DECK
> & {
  deck: Card[]
}

export type GiveHint = Action<GameActionNames.GIVE_HINT> & {
  playerHint: PlayerHint
}

export type GameAction =
  | DestructCardGame
  | SetCurrentTurnIdx
  | SetNextTurnIdx
  | SetDealerIdx
  | InitDeck
  | AddCardToDiscardPile
  | AddCardToBuildPile
  | RemoveCardFromDeck
  | GiveHint
