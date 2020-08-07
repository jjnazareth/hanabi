import React, { useState, ChangeEvent } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button, makeStyles, Theme, createStyles } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { LoginDialog } from './login/LoginDialog'


const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 0,
      padding: 0,
      minHeight: 0,
      minWidth: 0,
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
