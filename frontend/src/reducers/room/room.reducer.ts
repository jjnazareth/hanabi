import { RoomAction, RoomActionNames } from './room.actions.type'
import { GameAction } from '../game/game.actions.type'
import { Card, DiscardPile, CardColour, CardRank, Player } from '../../globalTypes'

export type Card = {
  idx: number,
  colour: CardColour,
  rank: CardRank
}

export interface IRoomState {
  players: Player[]
  lastDiscard: Card,
}

const initialState: IRoomState = {
  players: [],
  lastDiscard: { idx: "", colour: { name: "White", code: "#FFFFFF" }, rank: CardRank.Rank0 },
}

class inc {
  static count: number = 0;
  static inc(): number {
    return this.count++
  }
}


export function roomReducer (state = initialState, action:  RoomAction) {
  switch (action.type) {
    case RoomActionNames.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, { name: action.name, playerId: inc.inc(), turnIdx: -1, hand: [] }]
      }
    case RoomActionNames.INIT_HAND:

      return {
        ...state, players: state.players.map(p => {
          return { ...p, hand: p.turnIdx == action.turnIdx ? action.cards : p.hand }
          // index of player with the required turn index
        })
      }
    case RoomActionNames.SEAT_PLAYERS:
      return {
        ...state,
        players:
          state.players.map((p, i) => {
            return {
              ...p,
              turnIdx: action.turnIdxs[i]
            }
          })
      }
    case RoomActionNames.DISCARD:
      return {
        ...state,
        lastDiscard: action.card,
        players:
          state.players.map(p =>
            (
              p.playerId == action.player.playerId ?
                {
                  ...action.player,
                  hand: action.player.hand.filter
                    (card => card.idx !== action.card.idx)
                }
                : p
            )
          )
      }  
    default:
      return state;
  }

}

