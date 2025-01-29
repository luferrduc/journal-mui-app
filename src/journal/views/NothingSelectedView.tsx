import { StarOutline } from "@mui/icons-material"
import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

export const NothingSelectedView = () => {
  return (
    <Grid 
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ 
      minHeight: 'calc(100vh - 110px)',
      backgroundColor: 'primary.main',
      padding: {
        xs: 0,
        sm: 4
      },
      borderRadius: 2
    }}
    >
      <StarOutline sx={{ fontSize: 100, color: 'white'}} />
      <Typography color="white" variant="h5" textAlign="center">Selecciona o crea una entrada</Typography>
  </Grid>
  )
}