import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export type Seeds = { targets: number; failures: number }

export type Stages = { single: number; similar: number; mixed: number }

export type CreateWorkflowForm = {
  namespace: string
  seeds: Seeds
  stages: Stages
  targets: string[]
  failures: string[]
}

export const slice = createSlice({
  name: 'workflow',
  initialState: {
    namespace: '',
    seeds: { targets: 0, failures: 0 },
    stages: { single: 3, similar: 3, mixed: 3 },
    targets: [] as string[],
    failures: [] as string[],
  },
  reducers: {
    setNamespace: (state, action: PayloadAction<string>) => {
      state.namespace = action.payload
    },
    setSeeds: (state, action: PayloadAction<Seeds>) => {
      state.seeds = action.payload
    },
    setStages: (state, action: PayloadAction<Stages>) => {
      state.stages = action.payload
    },
    setTargetsIds: (state, action: PayloadAction<string[]>) => {
      state.targets = action.payload.map((_) => _)
    },
    addTargetById: (state, action: PayloadAction<string>) => {
      state.targets.push(action.payload)
    },
    removeTargetById: (state, action: PayloadAction<string>) => {
      state.targets = state.targets.filter((_) => _ !== action.payload)
    },
    setFailuresById: (state, action: PayloadAction<string[]>) => {
      state.failures = action.payload
    },
    addFailureById: (state, action: PayloadAction<string>) => {
      state.failures.push(action.payload)
    },
    removeFailureById: (state, action: PayloadAction<string>) => {
      state.failures = state.failures.filter((_) => _ !== action.payload)
    },
  },
})

export const selectCreateWorkflowForm = (
  state: RootState,
): CreateWorkflowForm => state.createWorkflowForm
export const selectNamespace = (state: RootState): string =>
  state.createWorkflowForm.namespace
export const selectSeeds = (state: RootState): Seeds =>
  state.createWorkflowForm.seeds
export const selectStages = (state: RootState): Stages =>
  state.createWorkflowForm.stages
export const selectTargets = (state: RootState): string[] =>
  state.createWorkflowForm.targets
export const selectFailures = (state: RootState): string[] =>
  state.createWorkflowForm.failures

export const {
  setNamespace,
  setSeeds,
  setStages,
  setTargetsIds,
  addTargetById,
  removeTargetById,
  setFailuresById,
  addFailureById,
  removeFailureById,
} = slice.actions

export default slice.reducer
