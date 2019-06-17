import { combineReducers } from 'redux';
import { roomReducer, IRoomState } from './room/room.reducer'
import { gameReducer, IGameState } from './game/game.reducer';
import { RoomAction } from './room/room.actions.type';
import { RoomActionNames } from './room/room.actions.type'

export interface IGlobalState {
  room: IRoomState,
  game: IGameState
}

export default combineReducers({
  room: roomReducer,
  game: gameReducer
})

function crossSliceReducer(state: IGlobalState, action: RoomAction) {
  switch (action.type) {
    case RoomActionNames.DISCARD:
      return {
        ...state,
        room: roomReducer(state.room, action),
        game: {
          ...state.game,
          discardPiles: []
        }
      }
    default:
      return state
  }
}  
