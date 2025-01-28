import { SaveOutlined } from "@mui/icons-material"
import { Button, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { ImageGallery } from "../components"


export const NoteView = () => {
  return (
    <Grid container direction="column" sx={{ mb: 1 }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={39} fontWeight="light">
          28 de agosto, 2023
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
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
        />
      </Grid>

      {/* Galería de imagenes */}
      <ImageGallery />
    </Grid>
  )
}