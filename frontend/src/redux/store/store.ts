import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../../services/servicesConfig/api.service'
import userReducer from '../slices/userSlice'
import alertReducer from '../slices/alertSlice'
import cartReducer from '../slices/cartSlice'

// Or from '@reduxjs/toolkit/query/react'

export const store = configureStore({
  reducer: {

    // Add the reducers
    user: userReducer,
    alert: alertReducer,
    cart: cartReducer,

    // Add the api reducer
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch