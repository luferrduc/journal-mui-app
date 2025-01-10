import { Box } from "@mui/material"
import { ReactNode } from "react"

const drawerWidth = 240

export const JournalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex">
      
      {/* Navbar */}

      {/* Sidebar */}

      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          p: 3
        }}
      >
        {/* Toolbar */}
        { children }
      </Box>
    </Box>
  )
}