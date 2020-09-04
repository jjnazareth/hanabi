import React, { useEffect, useContext, useState } from 'react'
import { Formik, Field, Form, useField, FieldAttributes } from 'formik'
import { TextField, Button, makeStyles, Theme, createStyles, Grid } from '@material-ui/core'

import { useSelector, connect } from 'react-redux'
import { IGlobalState } from '../../reducers'
import { Member } from '../../globalTypes'
import { addMember } from '../../actions'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 300,
      },
      '& .MuiButton-root': {
        margin: theme.spacing(2)
      }
    },
  }),
)

const UserNameField: React.FC<FieldAttributes<{}>> = (props) => {
  const [field, meta] = useField<{}>(props)
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <TextField variant="filled" label="User Name" {...field} helperText={errorText + ' '} error={!!errorText} />
  )
}

const PasswordField: React.FC<FieldAttributes<{}>> = (props) => {
  const [field, meta] = useField<{}>(props)
  const errorText = meta.error && meta.touched ? meta.error : ""
  return (
    <TextField variant="filled" label="Password" type="password"{...field} helperText={errorText + ' '} error={!!errorText} />
  )
}

interface IProps {
  addMember: (userName: string, password: string) => void
}

const _RegisterForm: React.FC<IProps> = ({ addMember }) => {
  const classes = useStyles()
  // const { app, api } = useContext(FirebaseContext)
  // const members = useSelector<IGlobalState, Member[]>(state => state.register.members)

  return (
    <Formik initialValues={{ userName: "", password: "" }}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        addMember(data.userName, data.password)
        // api && api.writeMember({ playerId: members.length + 1, userName: data.userName, password: data.password })
        setSubmitting(false)
        resetForm({})
      }}
      validate={(values) => {
        const errors: Record<string, string> = {}
        if (!/^[A-Z0-9]+$/i.test(values.userName)) { errors.userName = "No special chars or spaces allowed" }
        if (values.password.length < 4) { errors.password = "Password should be minimum 4 chars" }
        return errors
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form translate="yes" className={classes.root}>
          <Grid container>
            <Grid item xs={3} />
            <Grid container item xs={6} direction="column" alignItems="flex-end" justify="center" >
              <div>
                <Field placeholder="user name" name="userName" type="input" as={UserNameField} />
              </div>
              <div>
                <Field placeholder="password" name="password" as={PasswordField} />
              </div>
              <Grid item flex-grow={4}>
                <Button variant="contained" color="primary" disabled={isSubmitting} type="submit">submit</Button>
              </Grid>
              {/* <pre>{JSON.stringify(members, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </Form>
      )
      }
    </Formik >

  )
}


export const RegisterForm = connect(null, { addMember })(_RegisterForm)

