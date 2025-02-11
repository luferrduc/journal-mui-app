import { Navbar, Sidebar } from "@/ui/components"
import { Box, Toolbar } from "@mui/material"
import { ReactNode } from "react"

const drawerWidth = 240

export const JournalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex">
      
      <Navbar drawerWidth={drawerWidth}/>

      <Sidebar drawerWidth={drawerWidth}/>

      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          paddingX: {
            xs: 0,
            sm: 0,
            md: 2,
            lg: 3
          },
          paddingY: 3
        }}
      >
        <Toolbar />
        { children }
      </Box>
    </Box>
  )
}