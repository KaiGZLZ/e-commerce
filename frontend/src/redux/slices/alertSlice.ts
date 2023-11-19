import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type alertStatus =  'error' | 'info' | 'warning' | 'success' | 'loading' | undefined

interface alert {
  status: alertStatus
  title: string,
  message: string | undefined,
}

const initialState: alert = {
  status: undefined,
  title: '',
  message: '',
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<alert>) => {
      state.status = action.payload.status
      state.title = action.payload.title
      state.message = action.payload.message || ''
    },
    clearAlert: (state) => {
      state.status = undefined
      state.title = ''
      state.message = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAlert, clearAlert } = alertSlice.actions

export default alertSlice.reducer