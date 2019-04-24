import { Dispatch } from 'redux'
import { AddPlayer, RoomActionNames, SetCurrentPlayer, SetTurnIdx } from './room.actions.type'


export const initialisePlayers = () => (dispatch: Dispatch<AddPlayer | SetTurnIdx | SetCurrentPlayer >) => {
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        name: 'Jivraj'
    })
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        name: 'Nikesh'
    })
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        name: 'Shanta'
    })
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        name: 'Nitin'
    })
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        name: 'Mikey'
    })
    dispatch({
        type: RoomActionNames.SET_TURN_IDX,
        idx: 2
    })
    dispatch({
        type: RoomActionNames.SET_CURRENT_PLAYER,
        idx: 0
    })
}
