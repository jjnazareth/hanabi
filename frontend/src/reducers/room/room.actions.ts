import { Dispatch } from 'redux'
import { RoomActionNames, AddPlayer, SetTurnIdx, DealHands } from './room.actions.type'
import store from '../../store';
import { Card } from '../../globalTypes'


export const initialisePlayers = (players : [string, number][]) => (dispatch: Dispatch<AddPlayer | SetTurnIdx>) => {
    // players is an array of tuples with name and turn index
    players.forEach( p => {
        dispatch ({
            type: RoomActionNames.ADD_PLAYER,
            name: p[0]
        })
    }) 

    players.forEach((p, ndx) => {
        dispatch ({
            type: RoomActionNames.SET_TURN_IDX,
            playerId : ndx,
            turnIdx : p[1]
        })
    })
}

export const initHands = (pack : Card[]) => (dispatch: Dispatch<DealHands>) => {
    dispatch ({
        type: RoomActionNames.DEAL_HANDS,
        pack : pack
    })
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
export function dealHands(cards : Card[]) {
    return {
        type: RoomActionNames.DEAL_HANDS,
        pack: cards
    }
}