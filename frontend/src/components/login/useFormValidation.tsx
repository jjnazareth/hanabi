import { useState, useEffect, ChangeEvent, FormEvent, FocusEvent, MouseEvent, useContext } from "react"
import { FirebaseContext } from "../../firebase/firebase"
import { useSelector } from "react-redux"
import { IGlobalState } from "../../reducers"
import { Member } from "../../globalTypes"
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
        // const { app, api } = useContext(FirebaseContext)
        // const members = useSelector<IGlobalState, Member[]>(state => state.register.members)
        // send to firebase
        // console.log(members)
        // api && api.addMember({ playerId: /* members.length */ + 1, userName: values.playerName, password: values.password })
        // send from firebase to redux store
        // api && api.getMembers()
        console.log("authenticated!", ucFirst(values.playerName), values.password)
        setValues(initialState)
      }
      setSubmitting(false)
    }
  }, [errors, isSubmitting])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value.trim()
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

