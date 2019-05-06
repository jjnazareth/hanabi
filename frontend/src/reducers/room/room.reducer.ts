import { RoomAction, RoomActionNames, Player } from './room.actions.type'
import { addPlayer } from './room.actions';

export interface IRoomState {
    players: Player[]
    currentPlayerNo: number
}

export default function (state = initialState, action: RoomAction) {
    switch (action.type) {
        case RoomActionNames.ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, action.player]
            }
        case RoomActionNames.SET_TURN_IDX:           
            return {
                ...state,
                players : 
                    state.players.map (p => {
                        if (p.name == action.player.name) {
                            p.turnIdx = action.player.turnIdx
                        } 
                        return p             
                    })               
            }
        case RoomActionNames.SET_CURRENT_PLAYER:
            return {
                ...state,
                currentPlayerNo: action.currentPlayerNo
            }
        default:
            return state;
    }
}

const initialState: IRoomState = {
    players: [],
    currentPlayerNo: 0,
}
