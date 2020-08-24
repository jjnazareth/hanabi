import { Action } from "redux"
import { Member } from "../../globalTypes"

export enum RegisterActionNames {
  ADD_MEMBER = "ADD_MEMBER",
  SET_MEMBERS = "SET_MEMBERS",
  LOGIN_PLAYER = "LOGIN_PLAYER"
}

export type SetMembers = Action<RegisterActionNames.SET_MEMBERS> & {
  members: Member[]
}

export type AddMember = Action<RegisterActionNames.ADD_MEMBER> & {
  playerId: number
  userName: string
  password: string
}

export type LoginPlayer = Action<RegisterActionNames.LOGIN_PLAYER> & {
  userName: string
  password: string
}

export type RegisterAction = AddMember | SetMembers | LoginPlayer
