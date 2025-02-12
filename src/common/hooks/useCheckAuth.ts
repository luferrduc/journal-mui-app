import { FirebaseAuth } from "@/firebase/config"
import { login, logout } from "@/store/auth"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"


export const useCheckAuth = () => {
  
  const { status } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if(!user) return dispatch(logout({ errorMessage: null }))
      const { displayName, email, photoURL, uid } = user
      dispatch(login({ displayName, email, photoURL, uid }))
    })
  }, [])



  return {
    status,
    dispatch
  }
}