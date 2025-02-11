import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router"
import { onAuthStateChanged } from "firebase/auth"
import { AuthRoutes } from "@/auth/routes/AuthRoutes"
import { JournalRoutes } from "@/journal/routes/JournalRoutes"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { FirebaseAuth } from "@/firebase/config"
import { CheckingAuth } from "@/ui"
import { login, logout } from "@/store/auth"



export const AppRouter = () => {

  const { status } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if(!user) return dispatch(logout({ errorMessage: null }))
      const { displayName, email, photoURL, uid } = user
      dispatch(login({ displayName, email, photoURL, uid }))
    })
  }, [])

  if( status === 'checking'){
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
        status === "authenticated"
        ?  <Route path="/*" element={<JournalRoutes />}/>
        :  <Route path="/auth/*" element={<AuthRoutes />}/>
      }

      <Route path="/*" element={<Navigate to='/auth/login'/>}/>
      {/* Login y Resistro */}
      {/* <Route path="/auth/*" element={<AuthRoutes />}/> */}

      {/* Main App */}
      {/* <Route path="/*" element={<JournalRoutes />}/> */}

    </Routes>
  )
}