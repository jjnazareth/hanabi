import React, { useState, ChangeEvent } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button, makeStyles, Theme, createStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SaveIcon from "@material-ui/icons/Save"
import EditIcon from "@material-ui/icons/Edit"

import { LoginForm } from './login/LoginForm'
import { PlayersForm } from './login/PlayersForm'
// import CustomizedMenus from './login/Menu'


const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
)

interface IProps {
}

export const NavBar: React.FC<IProps> = () => {
  const classes = useStyles()
  const [open, setOpen] = useState({ login: false, setup: false })
  // const [value, setValue] = useState("")

  const handleLoginOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setOpen({ ...open, login: true })
  }
  const handleSetupOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setOpen({ ...open, setup: true })
  }

  const handleLoginClose = () => { setOpen({ ...open, login: false }) }
  const handleSetupClose = () => { setOpen({ ...open, setup: false }) }
  const handleClick = () => { alert("Hello") }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={handleClick} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Hanabi
          </Typography>
          <Button onClick={handleSetupOpen} color="inherit">Setup</Button>
          <IconButton color="inherit" aria-label="Edit">
            <SaveIcon />
          </IconButton>
          <Button onClick={handleLoginOpen} color="inherit">Login</Button>
          {/* </section> */}
        </Toolbar>
      </AppBar>
      <LoginForm open={open.login} handleClose={handleLoginClose}></LoginForm>
      <PlayersForm open={open.setup} handleClose={handleSetupClose}></PlayersForm>
    </div>
  )
}
