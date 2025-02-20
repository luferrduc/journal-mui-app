import { ChangeEvent, useEffect, useMemo } from "react"
import { toast } from "sonner"
import { format } from "@formkit/tempo"
import { CloudUpload, SaveOutlined } from "@mui/icons-material"
import { Button, TextField, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { ImageGallery } from "../components"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { useForm } from "@/common/hooks"
import { Note, setActiveNote, startUpdateNote, startUploadingFiles } from "@/store/journal"

export const NoteView = () => {

  const dispatch = useAppDispatch()
  const { active: note, messageSaved, isSaving } = useAppSelector(state => state.journal)

  // Formatear la fecha
  const { title, body, onInputChange, date, debouncedFormState} = useForm(note)

  const formatedDate = useMemo(() => {
    const newDate = new Date(date)
    return newDate ? format(newDate, "long") : newDate
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(debouncedFormState as Note))
  }, [debouncedFormState])
  
  useEffect(() => {
    if(messageSaved.length > 0){
      toast.success('Nota actualizada', {
        description: messageSaved,
      })
    }
  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startUpdateNote())
  }

  const onInputFileChange = ({ target }: ChangeEvent<HTMLInputElement> ) => {
    if(target.files === null) return

    dispatch(startUploadingFiles(target.files))
  }
  
  return (
    <Grid 
      className="animate__animated animate__fadeIn animate__faster"
      container direction="column" sx={{ mb: 1 }}
    >
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={39} fontWeight="light">
          {formatedDate}
        </Typography>
       <Grid>
        {/*
          //* Otra forma para hacer el input
          //* es crear el input, hacerlo display none
          //* crear otro botón, y hacer la referencia hacia
          //* el input file usando useRef y simular el click desde el botón
         */}
       <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUpload />}
          disabled={isSaving}
        >
          Upload files
          <input
            type="file"
            onChange={onInputFileChange}
            multiple
            style={{
              clip: 'rect(0 0 0 0)',
              clipPath: 'inset(50%)',
              height: 1,
              overflow: 'hidden',
              position: 'absolute',
              bottom: 0,
              left: 0,
              whiteSpace: 'nowrap',
              width: 1,
          }}
          disabled={isSaving}
          />
        </Button>
        <Button 
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary" 
          sx={{ paddingX: 2, paddingY: 1 }}
          >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
       </Grid>
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
      <ImageGallery images={note?.imagesUrls ?? []}/>
    </Grid>
  )
}