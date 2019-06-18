
import { Action } from 'redux';
import { GameAction, GameActionNames } from './game.actions.type'
import { RoomAction, RoomActionNames } from '../room/room.actions.type'
import { Card, DiscardPile, CardColour, CardRank, Player } from '../../globalTypes'

export interface IGameState {
  drawDeck: Card[]
  discardPiles: DiscardPile[]
  buildPile: Card[]
  currentTurnIdx: number
  dealerIdx: number,
}

const initialState: IGameState = {
  drawDeck: [],
  buildPile: [],
  currentTurnIdx: -1,
  dealerIdx: -1,
  discardPiles: [
    {colour: "White", cards: []},
    { colour: "Yellow", cards: [] },
    { colour: "Green", cards: [] },
    { colour: "Blue", cards:[] },
    { colour: "Red", cards: [] },
    { colour: "Multi", cards: [] },
  ]

}

export function gameReducer(state = initialState, action: any ) {
  switch (action.type) {
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
    case RoomActionNames.DISCARD:
      return {
        ...state,
        discardPiles:  state.discardPiles.map (pile => (
            pile.colour == action.card.colour.name?  { 
              colour : pile.colour, cards :
                 [ ...pile.cards, <Card>action.card].sort((x,y) => +x.rank - +y.rank)
                } : pile
          ))
      } 
    default:
      return state
  }
}
