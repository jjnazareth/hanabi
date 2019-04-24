import { RoomAction, RoomActionNames } from './room.actions.type'

export interface IRoomState {
    players: string[]
    currentPlayerNo: number | null
    turnIdx: number
}

export default function (state = initialState, action: RoomAction) {
    switch(action.type) {
        case RoomActionNames.ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, action.name]
            }
        case RoomActionNames.SET_TURN_IDX:
            return {
                ...state,
                turnIdx: action.idx
            }
        case RoomActionNames.SET_CURRENT_PLAYER:
            return {
                ...state,
                currentPlayerNo: action.idx
            }
        default:
            return state;
    }
}

const initialState: IRoomState = {
    players: [],
    currentPlayerNo: null,
    turnIdx: 0
}
