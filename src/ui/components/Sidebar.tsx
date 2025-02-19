import { SidebarItem } from "@/journal/components"
import { useAppSelector } from "@/store/hooks"
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"


export const Sidebar = ({ drawerWidth, isOpen }: { drawerWidth: number, isOpen: boolean }) => {

  const { displayName } = useAppSelector(state => state.auth)
  const { notes } = useAppSelector(state => state.journal)

  // TODO: ajustar sidebar para que en pantallas xs y sm se comporte como flotante al estar open
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        display: { xs: !isOpen ? 'none' : 'block', md: 'block' }
        
      }}
      className="animate__animated animate__fadeIn animate__faster"
    >
      <Drawer
        variant="permanent" // temporary si queremos ocultarla
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth}
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
          >
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {            
            notes.map( note => (
              <SidebarItem key={note.id} {...note}/>
            ))
          }
        </List>
      </Drawer>

    </Box>
  )
}