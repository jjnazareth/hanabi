import { combineReducers } from "redux"
import { registerReducer, IRegisterState } from "./register/register.reducer"
import { roomReducer, IRoomState } from "./room/room.reducer"
import { gameReducer, IGameState } from "./game/game.reducer"

export interface IGlobalState {
  room: IRoomState
  game: IGameState
}

export const rootReducer = combineReducers({
  register: registerReducer,
  room: roomReducer,
  game: gameReducer
})
