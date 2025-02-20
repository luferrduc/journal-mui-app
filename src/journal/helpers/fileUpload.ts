


export const fileUpload = async (file: File) => {

  if(!file) throw new Error('No hay ningún archivo para subir')

  const cloudURL = 'https://api.cloudinary.com/v1_1/dlgn8i37b/upload'
  const formData = new FormData()

  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const response = await fetch(cloudURL, {
      method: 'POST',
      body: formData
    })

    if(!response.ok) throw new Error('No se pudo subir la imagen')
    
    const cloudResponse = await response.json()

    return cloudResponse.secure_url as string
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("Ocurrió un error desconocido al subir el archivo")
  }

}