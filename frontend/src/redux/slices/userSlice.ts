import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface user {
  username: string,
  name: string,
  email: string,
  role: number,
  token: string,
}

const initialState = {
  username: '',
  name: '',
  email: '',
  role: 0,
  token: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<user>) => {
      state = action.payload
    },
    deleteUser: (state) => {
      state.username = ''
      state.name = ''
      state.email = ''
      state.role = 0
      state.token = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser, deleteUser } = userSlice.actions

export default userSlice.reducer