import Grid from "@mui/material/Grid2"
import { Typography } from "@mui/material"
import { ReactNode } from "react"

export const AuthLayout = ({ children, title = '' }: { children: ReactNode, title: string }) => {
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
        className="box-shadow"
        size={{
          xs: 10,
          sm: 8,
          md: 6,
          lg: 3
        }}
        sx={{
          width: { md: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2
        }}
      >
        <Typography variant='h5'>{title}</Typography>
        {children}
      </Grid>
    </Grid>
  )
}