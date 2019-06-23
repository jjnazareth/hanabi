import { RoomAction, RoomActionNames } from './room.actions.type'
import { Card, CardColour, CardRank, Player } from '../../globalTypes'

export type Card = {
  idx: number,
  colour: CardColour,
  rank: CardRank
}

export interface IRoomState {
  players: Player[]
}

const initialState: IRoomState = {
  players: [],
}

class inc {
  static count: number = 0;
  static inc(): number {
    return this.count++
  }
}


export function roomReducer(state = initialState, action: RoomAction) {
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
        players:
          state.players.map(p =>
            (
              p.playerId == action.player.playerId ?
                {
                  ...p,
                  hand: p.hand.filter  (card => card.idx != action.card.idx)
                }
                : p
            )
          )
      }
      
    case RoomActionNames.DRAW_CARD:
      return {
        ...state,
        players:
          state.players.map(p =>
            (
              p.playerId == action.player.playerId ?
                {
                  ...p,
                  hand: [...p.hand, action.card]
                }
                : p
            )
          )
      }
     
    default:
      return state;
  }

}

