import { useEffect } from "react"
import { FirebaseAuth } from "@/firebase/config"
import { login, logout } from "@/store/auth"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { startLoadingNotes } from "@/store/journal"
import { onAuthStateChanged } from "firebase/auth"


export const useCheckAuth = () => {
  
  const { status } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if(!user) return dispatch(logout({ errorMessage: null }))
      const { displayName, email, photoURL, uid } = user
      dispatch(login({ displayName, email, photoURL, uid }))
      dispatch(startLoadingNotes())
    })
  }, [])


  return {
    status,
    dispatch
  }
}