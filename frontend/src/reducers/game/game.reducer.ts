import { GameAction, GameActionNames } from "./game.actions.type"
import { Card, CardPile, PlayerHint } from "../../globalTypes"

export interface IGameState {
  drawDeck: Card[]
  buildPiles: CardPile[]
  discardPiles: CardPile[]
  currentTurnIdx: number
  dealerIdx: number
  hints: PlayerHint[]
}

const initialState: IGameState = {
  drawDeck: [],
  buildPiles: [
    { colour: "White", cards: [] },
    { colour: "Yellow", cards: [] },
    { colour: "Green", cards: [] },
    { colour: "Blue", cards: [] },
    { colour: "Red", cards: [] },
    { colour: "Multi", cards: [] }
  ],
  discardPiles: [
    { colour: "White", cards: [] },
    { colour: "Yellow", cards: [] },
    { colour: "Green", cards: [] },
    { colour: "Blue", cards: [] },
    { colour: "Red", cards: [] },
    { colour: "Multi", cards: [] }
  ],
  currentTurnIdx: -1,
  dealerIdx: -1,
  hints: []
}

export function gameReducer(state = initialState, action: GameAction) {
  switch (action.type) {
    case GameActionNames.DESTRUCT_CARD_GAME:
      return initialState
    case GameActionNames.SET_CURRENT_TURN:
      return {
        ...state,
        currentTurnIdx: action.currentTurnIdx
      }
    case GameActionNames.SET_NEXT_TURN:
      return {
        ...state,
        currentTurnIdx: (state.currentTurnIdx + 1) % action.numPlayers
      }
    case GameActionNames.SET_DEALER:
      return {
        ...state,
        dealerIdx: action.dealerIdx
      }
    case GameActionNames.ADD_CARD_TO_DISCARD_PILE:
      return {
        ...state,
        discardPiles: state.discardPiles.map((pile) =>
          pile.colour === action.card.colour.name
            ? {
                colour: pile.colour,
                cards: [...pile.cards, action.card].sort(
                  (x, y) => +x.rank - +y.rank
                )
              }
            : pile
        )
      }
    case GameActionNames.ADD_CARD_TO_BUILD_PILE:
      return {
        ...state,
        buildPiles: state.buildPiles.map((pile) =>
          pile.colour === action.card.colour.name
            ? {
                colour: pile.colour,
                cards: [...pile.cards, action.card]
              }
            : pile
        )
      }
    case GameActionNames.INIT_DECK:
      return {
        ...state,
        drawDeck: action.cards
      }
    case GameActionNames.REMOVE_CARD_FROM_DECK:
      return {
        ...state,
        drawDeck: state.drawDeck.slice(1)
      }
    case GameActionNames.GIVE_HINT:
      return {
        ...state,
        hints: [...state.hints, action.playerHint]
      }
    default:
      return state
  }
}
