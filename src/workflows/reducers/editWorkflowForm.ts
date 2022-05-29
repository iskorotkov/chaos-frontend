import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { Failure } from '../types/failures'
import { Target } from '../types/targets'

export type Step = {
  id: string
  failure: Failure
  target: Target
}

export type Stage = {
  id: string
  steps: Step[]
}

export type EditWorkflowForm = {
  namespace: string
  stages: Stage[]
}

const initialState: EditWorkflowForm = {
  namespace: '',
  stages: [],
}

export const slice = createSlice({
  name: 'custom-workflow',
  initialState,
  reducers: {
    setNamespace: (state, action: PayloadAction<string>) => {
      state.namespace = action.payload
    },
    addStage: (state, action: PayloadAction<Stage>) => {
      state.stages.push(action.payload)
    },
    removeStage: (state, action: PayloadAction<string>) => {
      state.stages = state.stages.filter((s) => s.id !== action.payload)
    },
    addStep: (state, action: PayloadAction<[string, Step]>) => {
      const stage = state.stages.find((s) => s.id === action.payload[0])
      if (!stage) {
        throw new Error('Stage not found')
      }

      stage.steps.push(action.payload[1])
    },
    removeStep: (state, action: PayloadAction<string>) => {
      const stage = state.stages.find(
        (s) => s.steps.findIndex((s) => s.id === action.payload) !== -1,
      )
      if (!stage) {
        throw new Error('Stage not found')
      }

      stage.steps = stage.steps.filter((s) => s.id !== action.payload)
    },
  },
})

export const selectCreateWorkflowForm = (state: RootState): EditWorkflowForm =>
  state.editWorkflowForm
export const selectNamespace = (state: RootState): string =>
  state.editWorkflowForm.namespace
export const selectStages = (state: RootState): Stage[] =>
  state.editWorkflowForm.stages
export const { setNamespace, addStage, removeStage, addStep, removeStep } =
  slice.actions

export default slice.reducer
