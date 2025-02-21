


export const fileUpload = async (file: File) => {

  if(!file) {
    console.error('No hay ningún archivo para subir')
    return null
  }

  const cloudURL = 'https://api.cloudinary.com/v1_1/dlgn8i37b/upload'
  const formData = new FormData()

  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const response = await fetch(cloudURL, {
      method: 'POST',
      body: formData
    })

    if(!response.ok){
      const errorText = await response.text();
      console.error('Error en la respuesta de Cloudinary:', errorText);
      // throw new Error(`Cloudinary error: ${errorText}`);
      return null
    }
    
    const cloudResponse = await response.json()

    return cloudResponse.secure_url as string
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      // throw new Error(error.message)
      return null
    }
    console.error("Ocurrió un error desconocido al subir el archivo")
    return null
  }

}