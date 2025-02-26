import { Navigate, Route, Routes } from "react-router"
import { AuthRoutes } from "@/auth/routes/AuthRoutes"
import { JournalRoutes } from "@/journal/routes/JournalRoutes"
import { CheckingAuth } from "@/ui"
import { useCheckAuth } from "@/common/hooks"



export const AppRouter = () => {

  const { status } = useCheckAuth()
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