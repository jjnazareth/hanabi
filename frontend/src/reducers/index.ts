import { combineReducers } from "redux"
import { registerReducer, IRegisterState } from "./register/register.reducer"
import { roomReducer, IRoomState } from "./room/room.reducer"
import { gameReducer, IGameState } from "./game/game.reducer"
import { firestoreReducer } from "redux-firestore"
import { firebaseReducer } from "react-redux-firebase"

export interface IGlobalState {
  register: IRegisterState
  room: IRoomState
  game: IGameState
}

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  register: registerReducer,
  room: roomReducer,
  game: gameReducer
})
