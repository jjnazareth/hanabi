import { Action } from "redux"

export enum JobActionNames {
  ADD_JOB = "ADD_JOB"
}

export type AddJob = Action<JobActionNames.ADD_JOB> & {
  description: string
  priority: number
}

export type JobAction = AddJob
