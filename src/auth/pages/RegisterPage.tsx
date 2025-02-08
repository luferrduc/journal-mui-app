import { FormEvent, useMemo, useState } from "react"
import { Alert, Button, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import Grid from "@mui/material/Grid2"
import { Link } from "@/common/components/Link"
import { useForm } from "@/common/hooks"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { startCreatingUserWithEmailAndPassword } from "@/store/auth"


const formData = {
  fullName: '',
  email: '',
  password: ''
}

const formValidations = {
  email: [
    (value: string) => (value.trim() !== "" ? null : "El email es obligatorio"),
    (value: string) => (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? null : "Formato de email inválido")
  ],
  password: [
    (value: string) => (value.trim() !== "" ? null : "La password es obligatoria"),
    (value: string) => (value.length >= 6 ? null : "Debe tener al menos 6 caracteres"),
    (value: string) => (/[A-Z]/.test(value) ? null : "Debe incluir una mayúscula"),
    (value: string) => (/[a-z]/.test(value) ? null : "Debe incluir una minúscula"),
    (value: string) => (/[0-9]/.test(value) ? null : "Debe incluir un número")
  ],
  fullName: [
    (value: string) => (value.trim() !== "" ? null : "El nombre es obligatorio"),
    (value: string) => (value.length >= 2 ? null : "Debe tener al menos 2 caracteres"),
    (value: string) => (/^[a-zA-Z\s]+$/.test(value) ? null : "El nombre solo debe contener letras y espacios"),
    (value: string) => (!/[!@#$%^&*()\-=_+{}[\]\\|;:'",.<>?/`~]/.test(value.trim()) ? null : "No debe tener caracteres especiales")
  ]
}

export const RegisterPage = () => {

  const dispatch = useAppDispatch()
  const { status, errorMessage } = useAppSelector((state) => state.auth)

  const isAuthenticating = useMemo(() => status === "checking", [status])

  const [formSubmitted, setFormSubmitted] = useState(false)
  const { email, fullName, password, onInputChange, formErrors, isFormValid } = useForm(formData, formValidations)

  const onSubmitForm = (event: FormEvent) => {
    event.preventDefault()
    setFormSubmitted(true)

    if(!isFormValid) return

    dispatch(startCreatingUserWithEmailAndPassword({ email, fullName, password }))
  }
  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmitForm}>
          <Grid container gap="1rem" marginTop="1rem">
            <Grid size={12}>
              <TextField 
                label="Nombre completo"
                type="text"
                placeholder="John Doe"
                fullWidth
                name="fullName"
                onChange={onInputChange}
                value={fullName}
                error={formErrors.fullName !== null && formSubmitted}
                helperText={formSubmitted ? formErrors.fullName : ''}
              />
            </Grid>
            <Grid size={12}>
              <TextField 
                label="Correo"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
                name="email"
                onChange={onInputChange}
                value={email}
                error={formErrors.email !== null && formSubmitted}
                helperText={formSubmitted ? formErrors.email: ''}
              />
            </Grid>
            <Grid size={12}>
              <TextField 
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                onChange={onInputChange}
                value={password}
                error={formErrors.password !== null && formSubmitted}
                helperText={formSubmitted ? formErrors.password : ''}
              />
            </Grid>
            <Grid container spacing={2} marginBottom={2} size={12}>
              <Grid size={12} display={errorMessage ? 'block': 'none'}>
                <Alert severity="error">
                  { errorMessage }
                </Alert>
              </Grid>
              <Grid size={12}>
                <Button type="submit" variant="contained" fullWidth disabled={isAuthenticating}>Register</Button>
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