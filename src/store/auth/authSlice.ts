// import { RootState } from '...'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type Status = 'checking' | 'not-authenticated' | 'authenticated'

export interface AuthState {
  status: Status,
  uid: number | null
  email: string | null
  displayName: string | null
  photoURL: string | null,
  errorMessage: string | null
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
    login: (state, action: PayloadAction<AuthState>) => {
      
    },
    logout: (state, action: PayloadAction<AuthState>) => {

    },
    checkingCredentials: (state) => {

    }

  },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
// export const selectTemplate = (state: RootState) => state.