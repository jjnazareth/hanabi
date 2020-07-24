import { combineReducers } from "redux"
import { roomReducer, IRoomState } from "./room/room.reducer"
import { gameReducer, IGameState } from "./game/game.reducer"

export interface IGlobalState {
  room: IRoomState
  game: IGameState
}

export const rootReducer = combineReducers({
  room: roomReducer,
  game: gameReducer
})
