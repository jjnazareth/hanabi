import { RegisterActionNames } from "./register.actions.type"

// ---------------- action creators -----------------------

export function loginPlayer(playerName: string) {
  return {
    type: RegisterActionNames.LOGIN_PLAYER,
    playerName: playerName
  }
}
