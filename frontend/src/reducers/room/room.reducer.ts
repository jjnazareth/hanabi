import { RoomAction, RoomActionNames } from './room.actions.type'
import { Player } from '../../globalTypes'


export interface IRoomState {
    players: Player[]
}

const initialState: IRoomState = {
    players: []
}
class inc {
    static count: number = 0;
    static inc(): number {
        return this.count++
    }
}

export default function (state = initialState, action: RoomAction) {
    switch (action.type) {
        case RoomActionNames.ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, { name: action.name, playerId: inc.inc(), turnIdx: -1, hand: [] }]
            }

        case RoomActionNames.INIT_HAND:
/* 
            let players = state.players.slice()
            let i = players.findIndex(p => p.turnIdx == action.turnIdx)
            players[i].hand = action.cards
 */

            return {
                ...state, players: state.players.map(p => {
                    return { ...p, hand: p.turnIdx == action.turnIdx ? action.cards : p.hand }
                    // index of player with the required turn index
                })
            }

        case RoomActionNames.SEAT_PLAYERS:

            return {
                ...state,
                players:
                    state.players.map((p, i) => {
                        return {
                            ...p,
                            turnIdx: action.turnIdxs[i]
                        }
                    })
            }
        default:
            return state;
    }

}

