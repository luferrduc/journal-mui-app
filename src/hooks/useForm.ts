import { ChangeEvent, useState } from 'react'


export const useForm = <T>(initialForm: T) => {
  const [formState, setFormState] = useState<T>(initialForm)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const { value, name } = input;
    setFormState(prev => ({
      ...prev,
        [name]: value
    }))
  }

  const onResetForm = () => {
    setFormState(initialForm)
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm
  }
}