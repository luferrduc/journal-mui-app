import { ReactNode, useState } from "react"
import { Box, Toolbar } from "@mui/material"
import { Navbar, Sidebar } from "@/ui/components"


const drawerWidth = 240

export const JournalLayout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box display="flex">
      <Navbar drawerWidth={drawerWidth} setIsOpen={setIsOpen} isOpen={isOpen}/>

      <Sidebar drawerWidth={drawerWidth} isOpen={isOpen}/>

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