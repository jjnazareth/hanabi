import React, { useState, ChangeEvent } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button, MenuItem, FormControl, InputLabel, Select } from '@material-ui/core'
import { useStyles } from '../Styles'
import MenuIcon from '@material-ui/icons/Menu'


interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> = () => {
  const classes = useStyles()
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}
