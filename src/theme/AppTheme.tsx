import { ReactNode } from "react"
import { ThemeProvider } from "@mui/material"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from "./"


export const AppTheme = ({ children }: {children: ReactNode}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}