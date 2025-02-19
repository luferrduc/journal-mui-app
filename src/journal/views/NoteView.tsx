import { SaveOutlined } from "@mui/icons-material"
import { Button, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { ImageGallery } from "../components"
import { useAppSelector } from "@/store/hooks"
import { format } from "@formkit/tempo"
import { useForm } from "@/common/hooks"
import { useMemo } from "react"

export const NoteView = () => {

  const { active: note } = useAppSelector(state => state.journal)
  // Formatear la fecha
  const { title, body, onInputChange, date, formState } = useForm(note)
  const formatedDate = useMemo(() => {
    const newDate = new Date(date)
    return newDate ? format(newDate, "long") : newDate
  }, [date])


  return (
    <Grid 
      className="animate__animated animate__fadeIn animate__faster"
      container direction="column" sx={{ mb: 1 }}
    >
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={39} fontWeight="light">
          {formatedDate}
        </Typography>
        <Button color="primary" sx={{ paddingX: 2, paddingY: 1 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid size={12}>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: 'none', mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      {/* Galería de imagenes */}
      <ImageGallery />
    </Grid>
  )
}