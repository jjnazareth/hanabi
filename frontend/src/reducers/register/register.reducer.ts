import { RegisterAction, RegisterActionNames } from "./register.actions.type"
import { Member } from "../../globalTypes"

export interface IRegisterState {
  members: Member[]
}

const initialState: IRegisterState = {
  members: []
}

export function registerReducer(state = initialState, action: RegisterAction) {
  switch (action.type) {
    case RegisterActionNames.SET_MEMBERS:
      return {
        ...state,
        members: action.members
      }
    case RegisterActionNames.ADD_MEMBER:
      return {
        ...state,
        members: [
          ...state.members,
          {
            playerId: action.playerId,
            userName: action.userName,
            password: action.password,
            isLoggedIn: false
          }
        ]
      }

    default:
      return state
  }
}
