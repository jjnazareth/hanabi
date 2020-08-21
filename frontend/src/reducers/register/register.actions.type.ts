import { Action } from "redux"

export enum RegisterActionNames {
  ADD_MEMBER = "ADD_MEMBER",
  LOGIN_PLAYER = "LOGIN_PLAYER"
}

export type AddMember = Action<RegisterActionNames.ADD_MEMBER> & {
  userName: string
  password: string
}

export type LoginPlayer = Action<RegisterActionNames.LOGIN_PLAYER> & {
  userName: string
  password: string
}

export type RegisterAction = AddMember | LoginPlayer
