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


  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    const { value, name } = input;
    setFormState(prev => ({
      ...prev,
        [name]: value
    }))

    // if (formValidations && formValidations[name as keyof T]) {
    //   const validationFns = formValidations[name as keyof T] || [];
    //   const errorMessage = (validationFns as ((value: string | T[keyof T]) => string | null)[])
    //     .map(fn => fn(value))
    //     .find(error => error !== null) || null;

    //   setFormErrors(prev => ({
    //     ...prev,
    //     [name]: errorMessage
    //   }))
    // }

    // console.log(formErrors)
  }

  
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
    isFormValid
  }
}