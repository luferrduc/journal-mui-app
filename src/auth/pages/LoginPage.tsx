// import { Link as RouterLink } from "react-router"
// import { Link } from "@mui/icons-material"
import { FormEvent, useMemo } from "react"
import { Google } from "@mui/icons-material"
import { Alert, Button, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { Link } from "@/ui/components/Link"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "@/common/hooks"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { startEmailAndPasswordSignIn, startGoogleSignIn } from "@/store/auth"

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const { email, password, onInputChange,  } = useForm<{email: string, password: string}>(formData)

  const isAuthenticating = useMemo( () => status === "checking", [status] )

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    dispatch(startEmailAndPasswordSignIn({ email, password }))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }


  return (
    <AuthLayout title="Login">
      <form aria-label="submit-form" onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container gap="1rem" marginTop="1rem">
            <Grid size={12}>
              <TextField 
                label="Correo"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
                autoComplete="username"
                name="email"
                onChange={onInputChange}
                value={email}
              />
            </Grid>
            <Grid size={12}>
              <TextField 
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                autoComplete="current-password"
                name="password"
                slotProps={{
                  input: {
                    inputProps: {
                      'data-testid': 'password'
                    }
                  }
                }}
                onChange={onInputChange}
                value={password}
              />
            </Grid>
            <Grid container spacing={2} marginBottom={2} size={12}>
              <Grid size={12} display={errorMessage ? 'block': 'none'}>
                <Alert severity="error">
                  { errorMessage }
                </Alert>
              </Grid>
              <Grid size={{
                xs: 12,
                sm:6
              }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  fullWidth  
                  disabled={isAuthenticating}
                >
                  Login
                </Button>
              </Grid>
              <Grid size={{
                xs: 12,
                sm:6
              }}>
                <Button 
                  variant="contained" 
                  fullWidth
                  aria-label="google-btn"
                  onClick={onGoogleSignIn}
                  disabled={isAuthenticating}
                  >
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