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
                        return {...p, 
                                turnIdx : p.playerId == action.playerId ? action.turnIdx :  p.turnIdx             
                        }   
                             
                    })               
            }
        case RoomActionNames.DEAL_HANDS:
            const  CARDS_IN_HAND : number = 4
            let arr  = Array.from(Array(CARDS_IN_HAND).keys())
                .map (i => i* state.players.length) // 0,4,8 etc 

            return {
                ... state, 
                players : state.players
                .map (p => {
                    let cards = arr.map(i => action.pack [i + p.turnIdx])
                    return { ...p, hand : cards }
                })
            }
        default:
            return state;
    }

}

