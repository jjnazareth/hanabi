import { combineReducers } from 'redux';
import roomReducer, { IRoomState } from './room/room.reducer'

export default combineReducers({
    room: roomReducer
});

export interface IGlobalState {
    room: IRoomState
}
