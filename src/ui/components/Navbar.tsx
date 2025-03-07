import { startLogout } from "@/store/auth"
import { useAppDispatch } from "@/store/hooks"
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"


interface Props {
  drawerWidth: number
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  isOpen: boolean 
}

export const Navbar = ({ drawerWidth, setIsOpen, isOpen }: Props) => {
  
  const dispatch = useAppDispatch()

  const onLogout = () => {
    dispatch(startLogout())
  }
  


  return (
    <AppBar 
      position="fixed"
      sx={{
        width: {xs: !isOpen ? '100%' : `calc(100% - ${drawerWidth}px)`, md: `calc(100% - ${drawerWidth}px)`},
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{
            mr: 2,
            display: { md: 'none' }
          }}

          onClick={() => setIsOpen(state => !state)}
        >
          <MenuOutlined/>
        </IconButton>
        <Grid 
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            width: '100%'
          }}
          size={12}
        >
          <Typography variant="h6" noWrap> Journal App</Typography>
          <IconButton color="error" onClick={ () => onLogout()}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
