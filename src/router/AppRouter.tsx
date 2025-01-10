import { Route, Routes } from "react-router"
import { AuthRoutes } from "@/auth/routes/AuthRoutes"
import { JournalRoutes } from "@/journal/routes/JournalRoutes"



export const AppRouter = () => {
  return (
    <Routes>
      {/* Login y Resistro */}
      <Route path="/auth/*" element={<AuthRoutes />}/>

      {/* Main App */}
      <Route path="/*" element={<JournalRoutes />}/>

    </Routes>
  )
}