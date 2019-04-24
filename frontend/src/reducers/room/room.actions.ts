import { Dispatch } from 'redux'
import { AddPlayer, RoomActionNames } from './room.actions.type'


export const initialisePlayers = () => (dispatch: Dispatch<AddPlayer>) => {
    dispatch({
        type: RoomActionNames.ADD_PLAYER,
        name: 'Jivraj'
    })
}
