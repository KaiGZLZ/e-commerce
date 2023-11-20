import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

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
    setAlert: (state, action: PayloadAction<alert | FetchBaseQueryError| SerializedError>) => {
      // If the payload is a custom message
      if('title' in action.payload && 'message' in action.payload && 'status' in action.payload){
        state.status = action.payload.status
        state.title = action.payload.title
        state.message = action.payload.message || ''
      }

      // If the payload is a FetchBaseQueryError
      else if ('data' in action.payload && typeof action.payload.data === 'object') {
        // Evalue if the data is a CustomError
        if(action.payload.data && 'message' in action.payload.data && 'name' in action.payload.data && 'data' in action.payload.data){

          if(typeof action.payload.data.message === 'string' && typeof action.payload.data.name === 'string' && typeof action.payload.data.data === 'object'){
            state.status = 'error'
            state.title = action.payload.data.name
            state.message = action.payload.data.message
          }
        }
      }

      // If the payload is a SerializedError
      else if('name' in action.payload && 'message' in action.payload){
        state.status = 'error'
        state.title = action.payload.name ? action.payload.name : 'Error'
        state.message = action.payload.message ? action.payload.message : 'Something went wrong'
      }

      else {
        state.status = 'error'
        state.title = 'Error'
        state.message = 'Something went wrong'
      }
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