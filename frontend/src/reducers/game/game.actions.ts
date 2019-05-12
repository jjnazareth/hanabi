import { Dispatch } from 'redux'
import { GameActionNames, SetCurrentTurnIdx } from './game.actions.type'

export const initGame = (currentTurnIdx : number) => 
        (dispatch: Dispatch<SetCurrentTurnIdx>) => {
    dispatch({
        type: GameActionNames.SET_CURRENT_TURN,
        currentTurnIdx : currentTurnIdx
    })
}

  

// ---------------- action creators -----------------------
export function setCurrentTurnIdx (idx : number) {
    return {
        type : GameActionNames.SET_CURRENT_TURN,
        currentTurnIdx : idx
    }
}



