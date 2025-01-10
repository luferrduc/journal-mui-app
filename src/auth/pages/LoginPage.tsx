// import { Link as RouterLink } from "react-router"
import { Google } from "@mui/icons-material"
import { Button, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
// import { Link } from "@mui/icons-material"
import { Link } from "@/common/components/Link"
import { AuthLayout } from "../layout/AuthLayout"



export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
          <Grid container gap="1rem" marginTop="1rem">
            <Grid size={12}>
              <TextField 
                label="Correo"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
              />
            </Grid>
            <Grid size={12}>
              <TextField 
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
              />
            </Grid>
            <Grid container spacing={2} marginBottom={2} size={12}>
              <Grid size={{
                xs: 12,
                sm:6
              }}>
                <Button variant="contained" fullWidth>Login</Button>
              </Grid>
              <Grid size={{
                xs: 12,
                sm:6
              }}>
                <Button variant="contained" fullWidth>
                  <Google />
                  <Typography marginLeft={1}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end' size={12}>
              {/* <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link> */}
              <Link to="/auth/register" color="inherit" text="Crear una cuenta"/>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}