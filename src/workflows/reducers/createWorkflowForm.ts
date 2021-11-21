import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type Stages = { single: number, similar: number, mixed: number }

export const slice = createSlice({
  name: 'workflow',
  initialState: {
    namespace: '',
    seed: 0,
    stages: { single: 3, similar: 3, mixed: 3 },
    targets: <string[]>[],
    failures: <string[]>[]
  },
  reducers: {
    setNamespace: (state, action: PayloadAction<string>) => {
      state.namespace = action.payload
    },
    setSeed: (state, action: PayloadAction<number>) => {
      state.seed = action.payload
    },
    setStages: (state, action: PayloadAction<Stages>) => {
      state.stages = action.payload
    },
    setTargetsIds: (state, action: PayloadAction<string[]>) => {
      state.targets = action.payload.map(_ => _)
    },
    addTargetById: (state, action: PayloadAction<string>) => {
      state.targets.push(action.payload)
    },
    removeTargetById: (state, action: PayloadAction<string>) => {
      state.targets = state.targets.filter(_ => _ !== action.payload)
    },
    setFailuresById: (state, action: PayloadAction<string[]>) => {
      state.failures = action.payload
    },
    addFailureById: (state, action: PayloadAction<string>) => {
      state.failures.push(action.payload)
    },
    removeFailureById: (state, action: PayloadAction<string>) => {
      state.failures = state.failures.filter(_ => _ !== action.payload)
    }
  }
})

export const selectNamespace = (state: RootState): string => state.createWorkflowForm.namespace
export const selectSeed = (state: RootState): number => state.createWorkflowForm.seed
export const selectStages = (state: RootState): Stages => state.createWorkflowForm.stages
export const selectTargets = (state: RootState): string[] => state.createWorkflowForm.targets
export const selectFailures = (state: RootState): string[] => state.createWorkflowForm.failures

export const {
  setNamespace,
  setSeed,
  setStages,
  setTargetsIds,
  addTargetById,
  removeTargetById,
  setFailuresById,
  addFailureById,
  removeFailureById
} = slice.actions

export default slice.reducer
