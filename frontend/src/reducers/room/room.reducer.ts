import { RoomAction, RoomActionNames} from './room.actions.type'
import { Player } from '../../globalTypes'


export interface IRoomState {
    players: Player[]
    currentPlayerNo: number
}

const initialState: IRoomState = {
    players: [],
    currentPlayerNo: 0,
}
class inc {
    static count : number = 0;
    static inc () : number {
        return this.count++
    }
}

export default function (state = initialState, action: RoomAction) {
    switch (action.type) {
        case RoomActionNames.ADD_PLAYER:                 
            return {
                ...state,
                players: [...state.players, { name : action.name, playerId: inc.inc(), turnIdx : -1, hand : [] } ]
            }
        case RoomActionNames.SET_TURN_IDX:           
            return {
                ...state,
                players : 
                    state.players.map (p => {                       
                        if (p.playerId == action.playerId) {
                            p.turnIdx = action.turnIdx
                        } 
                        return p             
                    })               
            }
             
        default:
            return state;
    }

}

