import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createWorkflowForm from './workflows/reducers/createWorkflowForm'
import editWorkflowForm from './workflows/reducers/editWorkflowForm'

export const store = configureStore({
  reducer: {
    createWorkflowForm: persistReducer(
      { key: 'create-workflow-form', storage },
      createWorkflowForm,
    ),
    editWorkflowForm: persistReducer(
      { key: 'edit-workflow-form', storage },
      editWorkflowForm,
    ),
  },
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
