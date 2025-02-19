import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Note, startSetActiveNote } from "@/store/journal"
import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"


export const Sidebar = ({ drawerWidth, isOpen }: { drawerWidth: number, isOpen: boolean }) => {

  const dispatch = useAppDispatch()
  const { displayName } = useAppSelector(state => state.auth)
  const { notes } = useAppSelector(state => state.journal)
  
  const onSetActiveNote = (note: Note) => {
    dispatch(startSetActiveNote(note))
  }


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
            // ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio']
            notes
            .map( note => (
              <ListItem key={note.id} disablePadding>
                <ListItemButton onClick={() => onSetActiveNote(note)}>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={note.title || "Lorem Title"}/>
                    <ListItemText secondary={note.body || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ratione minima, mollitia maiores in assumenda natus quaerat aut sit accusamus."}/>
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