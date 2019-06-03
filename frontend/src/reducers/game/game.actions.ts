import { Dispatch } from 'redux'
import { GameActionNames, SetCurrentTurnIdx, SetNextTurnIdx, SetDealerIdx } 
    from './game.actions.type'

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

export const setNextTurn = (numPlayers : number) => 
    (dispatch: Dispatch<SetNextTurnIdx>) => {
        dispatch({
            type: GameActionNames.SET_NEXT_TURN,
            numPlayers: numPlayers   
        })
    }
// ---------------- action creators -----------------------
export function setCurrentTurnIdx (idx : number) {
    return {
        type : GameActionNames.SET_CURRENT_TURN,
        currentTurnIdx : idx
    }
}
export function setNextTurnIdx (numPlayers : number) {
    return {
        type : GameActionNames.SET_NEXT_TURN,
        numPlayers : numPlayers  
    }
}



