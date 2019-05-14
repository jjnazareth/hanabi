import { Dispatch } from 'redux'
import { GameActionNames, SetCurrentTurnIdx, SetDealerIdx } from './game.actions.type'

export const initGame = (currentTurnIdx : number, dealerIdx : number) => 
        (dispatch: Dispatch<SetCurrentTurnIdx | SetDealerIdx>) => {
    dispatch({
        type: GameActionNames.SET_CURRENT_TURN,
        currentTurnIdx : currentTurnIdx
    })
    dispatch({
        type: GameActionNames.SET_DEALER,
        dealerIdx : dealerIdx
    })
}

  

// ---------------- action creators -----------------------
export function setCurrentTurnIdx (idx : number) {
    return {
        type : GameActionNames.SET_CURRENT_TURN,
        currentTurnIdx : idx
    }
}



