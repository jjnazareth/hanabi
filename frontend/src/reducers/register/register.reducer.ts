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
    case RegisterActionNames.ADD_MEMBER:
      return {
        ...state,
        members: [
          ...state.members,
          {
            playerId: state.members.length + 1,
            userName: action.userName,
            password: action.password,
            isLoggedIn: false
          }
        ]
      }
    // case RegisterActionNames.LOGIN_PLAYER:
    //   return {
    //     ...state,
    //     members: [
    //       ...state.members,
    //       {
    //         playerId: state.members.length + 1,
    //         userName: action.userName,
    //         password: action.password
    //       }
    //     ]
    //   }

    default:
      return state
  }
}
