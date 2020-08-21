import { JobActionNames, JobAction } from "./jobs.actions.type"

interface Job {
  description: string
  priority: number
}
export interface IJobState {
  jobs: Job[]
}

const initialState: IJobState = {
  jobs: []
}

export function jobReducer(state = initialState, action: JobAction) {
  switch (action.type) {
    case JobActionNames.ADD_JOB:
      let x = {
        ...state,
        jobs: [
          ...state.jobs,
          { description: action.description, priority: action.priority }
        ]
      }
      console.log(x)
      return x
    default:
      return state
  }
}
