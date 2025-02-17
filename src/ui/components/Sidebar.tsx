import { useAppSelector } from "@/store/hooks"
import { ChevronLeft, ChevronRight, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from "@mui/material"
import Grid from "@mui/material/Grid2"


export const Sidebar = ({ drawerWidth, isOpen }: { drawerWidth: number, isOpen: boolean }) => {
  // const theme = useTheme();
  const { displayName } = useAppSelector(state => state.auth)

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
          {/* <IconButton onClick={ () => {} }>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton> */}
        </Toolbar>
        <Divider />
        <List>
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'].map( text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={text}/>
                    <ListItemText secondary={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto, fuga!'}/>
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>

    </Box>
  )
}