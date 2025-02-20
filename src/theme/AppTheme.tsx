import { ReactNode } from "react"
import { ThemeProvider } from "@mui/material"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from "./"
import { Toaster } from "sonner"


export const AppTheme = ({ children }: {children: ReactNode}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
      <Toaster
        richColors  
        position="top-right"
        // theme={purpleTheme.palette.mode === "dark" ? "dark" : "light"}
        // toastOptions={{
        //   style: {
        //     background: purpleTheme.palette.background.paper,
        //     color: purpleTheme.palette.primary.main,
        //     border: `1px solid ${purpleTheme.palette.divider}`,

        //   },
        // }}
      />
    </ThemeProvider>
  )
}