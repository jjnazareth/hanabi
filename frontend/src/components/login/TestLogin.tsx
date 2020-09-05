import React, { useState, ChangeEvent } from 'react'
import { FormControl, InputLabel, Select, makeStyles, Theme, createStyles } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { loginMember } from '../../actions'
import { connect } from 'react-redux'

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  })
)

interface IProps {
  loginMember: (userName: string, password: string) => void
}

const _TestLogin: React.FC<IProps> = ({ loginMember }) => {
  const classes = useStyles()
  const [playerName, setPlayerName] = useState<string>("")
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    let value = event.target.value as string
    setPlayerName(value)  // controlled component
    loginMember(value, "test")    // redux dispatch
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Logged Player</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={playerName}
        onChange={handleChange}
      >
        <MenuItem value={"Jivraj"}>Jivraj</MenuItem>
        <MenuItem value={"Shanta"}>Shanta</MenuItem>
        <MenuItem value={"Mikey"}>Mikey</MenuItem>
        <MenuItem value={"Nitin"}>Nitin</MenuItem>
        <MenuItem value={"Nikesh"}>Nikesh</MenuItem>
      </Select>
    </FormControl>
  )
}

export const TestLogin = connect(null, { loginMember })(_TestLogin)
