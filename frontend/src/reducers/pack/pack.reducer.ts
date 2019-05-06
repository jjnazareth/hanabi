import { PackAction, PackActionNames } from './pack.actions.type'
import { Card } from './pack.actions.type'

export interface IPackState {
    pack: Card[]
}
const initialState: IPackState = {
    pack: []
}

export default function (state = initialState, action: PackAction) {
    switch (action.type) {
        case PackActionNames.INIT_PACK:
            return {
                ...state,
                pack: action.pack
            }
        default:
            return state;

    }
}
