import { RegisterActionNames } from "./register.actions.type"
import { Member } from "../../globalTypes"

// ---------------- action creators -----------------------

export function setMembers(members: Member[]) {
  return {
    type: RegisterActionNames.SET_MEMBERS,
    members: members
  }
}

export function addMember(userName: string, password: string) {
  return {
    type: RegisterActionNames.ADD_MEMBER,
    userName: userName,
    password: password
  }
}

export function loginMember(userName: string, password: string) {
  return {
    type: RegisterActionNames.LOGIN_MEMBER,
    userName: userName,
    password: password
  }
}
