// import { RootState } from '...'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type Status = 'checking' | 'not-authenticated' | 'authenticated'

export interface AuthState {
  status: Status,
  uid: string | null
  email: string | null
  displayName: string | null
  photoURL: string | null,
  errorMessage?: string | null
}

const initialState: AuthState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null
} 

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<AuthState, "status">>) => {
      state.status = 'authenticated'
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.displayName = action.payload.displayName
      state.photoURL = action.payload.photoURL
      state.errorMessage = null
    },
    logout: (state, action: PayloadAction<Pick<AuthState, "errorMessage">>) => {
      state.status = 'not-authenticated'
      state.uid = null
      state.email = null
      state.displayName = null
      state.photoURL = null
      state.errorMessage = action.payload.errorMessage
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }

  },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
// export const selectTemplate = (state: RootState) => state.