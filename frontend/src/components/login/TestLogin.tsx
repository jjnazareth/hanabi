import React, { useState, ChangeEvent, useEffect } from 'react'
import { FormControl, InputLabel, Select } from '@material-ui/core'
import { MenuItem } from '@material-ui/core'
import { loginPlayer } from '../../actions'
import { useStyles } from '../../Styles'
import { connect } from 'react-redux'

interface IProps {
  loginPlayer: (playerName: string) => void
}

const TestLogin: React.FC<IProps> = ({ loginPlayer }) => {
  const classes = useStyles()
  const [playerName, setPlayerName] = useState<string>("")
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    let value = event.target.value as string
    setPlayerName(value)  // controlled component
    loginPlayer(value)    // redux dispatch
  }

  return (
    <div>
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
    </div>
  )
}

export default connect(null, { loginPlayer })(TestLogin)
