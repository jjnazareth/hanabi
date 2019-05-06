import { Dispatch } from 'redux'
import { RoomActionNames, AddPlayer, SetCurrentPlayer, SetTurnIdx } from './room.actions.type'

export const initialisePlayers = () => (dispatch: Dispatch<AddPlayer | SetTurnIdx | SetCurrentPlayer >) => {
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        player: { name : 'Jivraj', turnIdx : null, hand : null }
    })
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        player: { name : 'Shanta', turnIdx : null, hand : null }
 
    })
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        player: { name : 'Nikesh', turnIdx : null, hand : null }
    })
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        player: { name : 'Nitin', turnIdx : null, hand : null }
    })
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        player: { name : 'Mikey', turnIdx : null, hand : null }
    })

 /*    dispatch({
        type: RoomActionNames.SET_TURN_IDX,
        player : { name : 'Mikey', turnIdx : 2, hand : null}
    }) */

    dispatch({
        type: RoomActionNames.SET_CURRENT_PLAYER,
        currentPlayerNo : 3
    })
}

export function addPlayer (playerName : string) {
    return {
        type : RoomActionNames.ADD_PLAYER,
        name : playerName
    }
}
export function setTurnIdx (idx : number) {
    return {
        type : RoomActionNames.SET_TURN_IDX,
        idx : idx
    }
}
export function setCurrentPlayer (idx : number) {
    return {
        type : RoomActionNames.SET_CURRENT_PLAYER,
        idx : idx
    }
}
