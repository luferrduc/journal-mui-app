import { logoutApp, registerWithEmailAndPassword, signInEmailAndPassword, signInWithGoogle } from "@/firebase/providers"
import { AppDispatch } from "../store"
import { checkingCredentials, login, logout } from "./authSlice"
import { RegisterWithEmail } from "./types"

// TODO: Intentar llevarlo con el createAsyncThunk

export const checkingAuthentication = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())
    const result = await signInWithGoogle()

    if(!result.ok) return dispatch(logout({ errorMessage: result.errorMessage! }))

    dispatch(login({ displayName: result.displayName!, email: result.email!, photoURL: result.photoURL!, uid: result.uid! }))

  }
}


export const startCreatingUserWithEmailAndPassword = ({ email, password, fullName }: RegisterWithEmail ) => {
  return async (dispatch: AppDispatch) => {

    dispatch(checkingCredentials())

    const result = await registerWithEmailAndPassword({ email, password, fullName })
    
    if(!result.ok) return dispatch(logout({ errorMessage: result.errorMessage! }))
    
    dispatch(login({ displayName: result.displayName!, email: result.email!, photoURL: result.photoURL!, uid: result.uid! }))
    
  }
}


export const startEmailAndPasswordSignIn = ({ email, password }: Omit<RegisterWithEmail, "fullName"> ) => {
  return async (dispatch: AppDispatch) => {
    dispatch(checkingCredentials())

    const result = await signInEmailAndPassword({ email, password })
    if(!result.ok) return dispatch(logout({ errorMessage: result.errorMessage! }))

    dispatch(login({ displayName: result.displayName!, email: result.email!, photoURL: result.photoURL!, uid: result.uid! }))
  }
}


export const startLogout = () => {
  return async (dispatch: AppDispatch) => {
    // dispatch(checkingCredentials())

    const result = await logoutApp()
    if(!result.ok) return dispatch(logout({ errorMessage: result.errorMessage! }))

    dispatch(logout())
  }
}