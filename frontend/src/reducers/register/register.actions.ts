import { RegisterActionNames } from "./register.actions.type"

// ---------------- action creators -----------------------

export function addMember(userName: string, password: string) {
  return {
    type: RegisterActionNames.ADD_MEMBER,
    userName: userName,
    password: password
  }
}

export function loginPlayer(playerName: string) {
  return {
    type: RegisterActionNames.LOGIN_PLAYER,
    playerName: playerName
  }
}
