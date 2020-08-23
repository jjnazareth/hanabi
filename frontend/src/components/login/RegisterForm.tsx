import React from 'react'
import { Formik, Field, Form, useField, FieldAttributes } from 'formik'
import { TextField, Button, makeStyles, Theme, createStyles } from '@material-ui/core'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& Mui-TextField': {
        margin: theme.spacing(10),
        width: '25ch',
      },
    },
  })
)

const MyTextField: React.FC<FieldAttributes<{}>> = (props) => {
  const [field, meta] = useField<{}>(props)
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <TextField {...field} helperText={errorText} error={!!errorText} />
  )
}


export const RegisterForm: React.FC<{}> = () => {
  const classes = useStyles()
  return (
    <div className="classes.root">
      <Formik initialValues={{ firstName: "", lastName: "" }}

        validate={(values) => {
          const errors: Record<string, string> = {}
          if (values.firstName.includes("bob")) { errors.firstName = "nobob" }
          if (values.lastName.includes("bob")) { errors.lastName = "nobob" }
          return errors
        }}

        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          console.log('submit: ', data)
          setSubmitting(false)
        }}

      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <div>
              <Field placeholder="first name" name="firstName" type="input" as={MyTextField} />
            </div>
            <div>
              <Field placeholder="last name" name="lastName" type="input" as={MyTextField} />
            </div>
            <div>
              <Button disabled={isSubmitting} type="submit">submit</Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )
        }
      </Formik >
    </div >
  )
}


