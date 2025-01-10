import { Button, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import Grid from "@mui/material/Grid2"
import { Link } from "@/common/components/Link"

export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear cuenta">
      <form>
          <Grid container gap="1rem" marginTop="1rem">
            <Grid size={12}>
              <TextField 
                label="Nombre completo"
                type="text"
                placeholder="John Doe"
                fullWidth
              />
            </Grid>
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
              <Grid size={12}>
                <Button variant="contained" fullWidth>Register</Button>
              </Grid>              
            </Grid>
            <Grid container direction='row'  size={12} sx={{
              justifyContent: {
                xs: 'center',
                sm: 'end'
              }
            }}>
              {/* <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link> */}
              <Typography marginRight={1}>¿Ya tienes cuenta?</Typography>
              <Link to="/auth/login" color="inherit" text="Iniciar sesión"/>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}