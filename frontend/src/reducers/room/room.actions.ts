import { Dispatch } from 'redux'
import { RoomActionNames, AddPlayer, SetTurnIdx } from './room.actions.type'
import store from '../../store';

export const initialisePlayers = (players : [string, number][]) => (dispatch: Dispatch<AddPlayer | SetTurnIdx>) => {
    // players is an array of tuples with name and turn index
    players.forEach( player => {
        dispatch ({
            type: RoomActionNames.ADD_PLAYER,
            player: { name: player[0] }
        })
    })

    store.getState().room.players.forEach((p, ndx) => {
        dispatch ({
            type: RoomActionNames.SET_TURN_IDX,
            playerId : p.playerId || 0, // 0 if player has not been initialised with id before
            turnIdx : players[ndx][1]
        })
    })
   console.log (store.getState())
}

// ---------------- action creators -----------------------
export function addPlayer(playerName: string) {
    return {
        type: RoomActionNames.ADD_PLAYER,
        name: playerName
    }
}
export function setTurnIdx(idx: number) {
    return {
        type: RoomActionNames.SET_TURN_IDX,
        playerId: idx
    }
}
