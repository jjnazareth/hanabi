import { Dispatch } from 'redux'
import { RoomActionNames, AddPlayer, SeatPlayers, InitHand } from './room.actions.type'
import { Card } from '../../globalTypes'


export const initialisePlayers = (names: string[]) => (dispatch: Dispatch<AddPlayer>) => {
    names.forEach(n => {
        dispatch({
            type: RoomActionNames.ADD_PLAYER,
            name: n
        })
    })
}

export const initSeats = (turnIdxs: number[]) => (dispatch: Dispatch<SeatPlayers>) => {
    dispatch({
        type: RoomActionNames.SEAT_PLAYERS,
        turnIdxs: turnIdxs
    })
}

export const initHand = (turnIdx: number, cards: Card[]) => (dispatch: Dispatch<InitHand>) => {
    dispatch({
        type: RoomActionNames.INIT_HAND,
        turnIdx: turnIdx,
        cards: cards
    })

}

// ---------------- action creators -----------------------
export function addPlayer(playerName: string) {
    return {
        type: RoomActionNames.ADD_PLAYER,
        name: playerName
    }
}

export function seatPlayers(idxs: number[]) {
    return {
        type: RoomActionNames.SEAT_PLAYERS,
        playerIds: idxs
    }
}

