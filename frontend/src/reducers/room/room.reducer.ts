import { RoomAction, RoomActionNames } from "./room.actions.type"
import { Player } from "../../globalTypes"

export interface IRoomState {
  players: Player[]
}

const initialState: IRoomState = {
  players: []
}

export function roomReducer(state = initialState, action: RoomAction) {
  switch (action.type) {
    case RoomActionNames.LOGIN_PLAYER:
      return {
        ...state,
        players: state.players.map((p) => ({
          ...p,
          isLoggedIn: p.name === action.name
        }))
      }
    case RoomActionNames.ADD_PLAYER:
      return {
        ...state,
        players: [
          ...state.players,
          {
            name: action.name,
            playerId: state.players.length,
            turnIdx: -1,
            hand: [],
            isLoggedIn: false
          }
        ]
      }
    case RoomActionNames.INIT_HAND:
      return {
        ...state,
        players: state.players.map((p) => {
          return {
            ...p,
            hand: p.turnIdx === action.turnIdx ? action.cards : p.hand
          }
          // index of player with the required turn index
        })
      }
    case RoomActionNames.SEAT_PLAYERS:
      return {
        ...state,
        players: state.players.map((p, i) => {
          return {
            ...p,
            turnIdx: action.turnIdxs[i]
          }
        })
      }
    case RoomActionNames.REMOVE_CARD_FROM_HAND:
      return {
        ...state,
        players: state.players.map((p) =>
          p.playerId == action.player.playerId
            ? {
                ...p,
                hand: p.hand.filter((card) => card.idx != action.card.idx)
              }
            : p
        )
      }

    case RoomActionNames.ADD_CARD_TO_HAND:
      return {
        ...state,
        players: state.players.map((p) =>
          p.playerId == action.player.playerId
            ? {
                ...p,
                hand: [...p.hand, action.card]
              }
            : p
        )
      }

    default:
      return state
  }
}
