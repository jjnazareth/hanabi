import { JobActionNames } from "./jobs.actions.type"

// ---------------- action creators -----------------------

export function addJob(description: string, priority: number) {
  return {
    type: JobActionNames.ADD_JOB,
    description: description,
    priority: priority
  }
}
