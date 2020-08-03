import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles, Theme, createStyles } from '@material-ui/core'
import { useFormValidation } from './useFormValidation'
import { validateAuth } from './validateAuth'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        // width: 200,
      },
    },
  })
)

const initialState = { playerName: "", password: "" }

interface IProps {
  open: boolean
  handleClose: () => void
}

export const LoginDialog: React.FC<IProps> = ({ open, handleClose }) => {
  const classes = useStyles()
  const { handleSubmit, handleChange, handleBlur, values, errors, isSubmitting } = useFormValidation(initialState, validateAuth)
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md">
      <DialogTitle id="form-dialog-title">Login Name</DialogTitle>
      <DialogContent >
        <TextField variant="filled" type="text" name="playerName" label="player name" fullWidth
          onChange={handleChange} onBlur={handleBlur} value={values.playerName}
          autoComplete='off' placeholder="Your name"
          error={errors.playerName.length > 0}
          helperText={errors.playerName.length > 0 ? errors.playerName : " "}
        />
        <TextField variant="filled" type="password" name="password" label="password" fullWidth
          onChange={handleChange} onBlur={handleBlur} value={values.password}
          placeholder="Choose a safe password"
          error={errors.password.length > 0}
          helperText={errors.password.length > 0 ? errors.password : " "}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" >
          Submit
          </Button>
      </DialogActions>
    </Dialog>
  )
}

