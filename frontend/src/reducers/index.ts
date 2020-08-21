import { combineReducers } from "redux"
import { registerReducer, IRegisterState } from "./register/register.reducer"
import { roomReducer, IRoomState } from "./room/room.reducer"
import { gameReducer, IGameState } from "./game/game.reducer"
import { IJobState, jobReducer } from "./jobs/jobs.reducer"

export interface IGlobalState {
  jobs: IJobState
  register: IRegisterState
  room: IRoomState
  game: IGameState
}

export const rootReducer = combineReducers({
  job: jobReducer,
  register: registerReducer,
  room: roomReducer,
  game: gameReducer
})
