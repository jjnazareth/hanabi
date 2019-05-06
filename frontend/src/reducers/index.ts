import { combineReducers } from 'redux';
import roomReducer, { IRoomState } from './room/room.reducer'
import packReducer, { IPackState } from './pack/pack.reducer'

export default combineReducers({
    room: roomReducer,
    pack: packReducer
});

export interface IGlobalState {
    room: IRoomState,
    pack: IPackState
}
