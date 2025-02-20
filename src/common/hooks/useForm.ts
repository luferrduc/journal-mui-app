import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'



export const useForm = <
  T, 
  V extends Partial<Record<keyof T, ((value: T[keyof T]) => string | null)[]>> = Partial<Record<keyof T, ((value: T[keyof T]) => string | null)[]>> 
  >(
    initialForm: T, 
    formValidations?: V
  ) => {
  const [formState, setFormState] = useState<T>(initialForm)
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof T, string | null>>>({});
  const [debouncedFormState, setDebouncedFormState] = useState<T>(initialForm);

  const isFormValid = useMemo( () => {
    for (const formValue of Object.keys(formErrors)) {
      if(formErrors[formValue as keyof T] !== null) return false
    }
    return true
  }, [formErrors])

  const createValidations = useCallback(() => {
    
    const formCheckedValues: Partial<Record<keyof T, string | null>> = {};
    if(formValidations){
      for (const formField of Object.keys(formValidations)) {
        const fieldValidations = formValidations[formField as keyof T]
        const errorMessage = fieldValidations
                            ?.map( fn => fn(formState[formField as keyof T]))
                            .find( error => error !== null) || null
        if(errorMessage){
          formCheckedValues[formField as keyof T] = errorMessage
        } else {
          formCheckedValues[formField as keyof T] = null
        }                                                     
      }
    } 

    setFormErrors(formCheckedValues)
  }, [formValidations, formState])

  useEffect( () => {
    createValidations()
  }, [createValidations])

  useEffect(() => {
    setFormState(initialForm)
  }, [initialForm])


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFormState(formState);
    }, 500)

    return () => {
      clearTimeout(handler);
    };
  }, [formState]);

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const { value, name } = input;
    setFormState(prev => ({
      ...prev,
        [name]: value
    }))
  }, [])

  
  const onResetForm = () => {
    setFormState(initialForm)
    setFormErrors({});
  }

  
  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    formErrors,
    isFormValid,
    debouncedFormState
  }
}