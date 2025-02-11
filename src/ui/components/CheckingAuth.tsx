import { CircularProgress } from "@mui/material"
import Grid from "@mui/material/Grid2"



export const CheckingAuth = () => {
  return (
    <Grid 
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ 
      minHeight: '100vh',
      backgroundColor: 'primary.main',
      padding: {
        xs: 0,
        sm: 4
      }
    }}
    >
      <Grid
        sx={{
          width: { md: 450 }          
        }}
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <CircularProgress color="warning"/>
      </Grid>
    </Grid>
  )
}