import React, { useState, ChangeEvent } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@material-ui/core'
import { useStyles } from '../Styles'
import MenuIcon from '@material-ui/icons/Menu'
import { LoginDialog } from './login/LoginDialog'




interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  // const [value, setValue] = useState("")

  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Hanabi
          </Typography>
          <Button onClick={handleClickOpen} color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <LoginDialog open={open} handleClose={handleClose}></LoginDialog>
    </div>
  )
}
