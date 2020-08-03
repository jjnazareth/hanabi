import { data } from './useFormValidation'

export const validateAuth = (values: data) => {
  //email errors
  let errors = { playerName: "", password: "" }
  if (!values.playerName) {
    errors.playerName = 'Required First Name'
  } else if (
    // !/^[A-Z0-9_+-]+/i.test(values.playerName)
    !/^[A-Z]+$/i.test(values.playerName)
  ) {
    errors.playerName = 'Invalid name'
  }

  // password errors
  if (!values.password) {
    errors.password = 'Required Password'
  } else if (values.password.length < 4) {
    errors.password = "Password must be at least 4 characters"
  }
  return errors

}
