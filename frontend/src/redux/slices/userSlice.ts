import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


const initialState = {
  username: '',
  firstname: '',
  lastname: '',
  email: '',
  role: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user>) => {
      state.username = action.payload.username
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.email = action.payload.email
      state.role = action.payload.role
    },
    deleteUser: (state) => {
      state.username = ''
      state.firstname = ''
      state.lastname = ''
      state.email = ''
      state.role = 0
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, deleteUser } = userSlice.actions

export default userSlice.reducer