import { Dispatch } from 'redux'
import { GameActionNames, Deal, SetCurrentTurnIdx} from './game.actions.type'
import { setTurnIdx} from '../room/room.actions'


export const initGame = () => (dispatch: Dispatch<Deal | SetCurrentTurnIdx>) => {
    dispatch({
        type: GameActionNames.DEAL
    })
    dispatch({
        type: GameActionNames.SET_CURRENT_TURN,
        currentTurnIdx : 3
    })
}

export function setCurrentTurnIdx (idx : number) {
    return {
        type : GameActionNames.SET_CURRENT_TURN,
        currentTurnIdx : idx
    }
}
