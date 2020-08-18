import { Action } from "redux"
import { Card, Player } from "../../globalTypes"

export enum RegisterActionNames {
  LOGIN_PLAYER = "LOGIN_PLAYER"
}

export type LoginPlayer = Action<RegisterActionNames.LOGIN_PLAYER> & {
  userName: string
  password: string
}

export type RegisterAction = LoginPlayer
