import { useState, useEffect, ChangeEvent, FormEvent, FocusEvent, MouseEvent } from "react"
export type data = { playerName: string, password: string }

const ucFirst = ((str: string) => str[0].toUpperCase() + str.slice(1).toLowerCase())

export const useFormValidation = (initialState: data, validate: (values: data) => data) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({ playerName: "", password: "" })
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = errors.playerName === "" && errors.password === ""/* Object.keys(errors).length === 0 */
      if (noErrors) {
        console.log("authenticated!", ucFirst(values.playerName), values.password)
      }
      setSubmitting(false)
    }
  }, [errors, isSubmitting])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleBlur = (_event: FocusEvent<HTMLInputElement>) => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitting(true)
  }

  return { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting }

}

