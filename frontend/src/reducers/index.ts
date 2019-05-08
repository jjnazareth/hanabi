import { combineReducers } from 'redux';
import roomReducer, { IRoomState } from './room/room.reducer'
import packReducer, { IPackState } from './pack/pack.reducer'
import gameReducer, { IGameState } from './game/game.reducer';

export default combineReducers({
    room: roomReducer,
    pack: packReducer,
    game: gameReducer
});

export interface IGlobalState {
    room: IRoomState,
    pack: IPackState,
    game: IGameState
}
