import React, { useState, ChangeEvent } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button, makeStyles, Theme, createStyles, useTheme, Menu } from '@material-ui/core'
import SaveIcon from "@material-ui/icons/Save"

import { LoginForm } from './login/LoginForm'
import { Link as RouterLink, withRouter, BrowserRouter } from "react-router-dom"

import { Route, Switch } from "react-router-dom"
import { Setup } from './Setup'
import { Game } from './Game'
import { IRoomState } from '../reducers/room/room.reducer'
import { IGameState } from '../reducers/game/game.reducer'



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
    headerOptions: {
      display: "flex",
      flex: 1,
      justifyContent: "space-evenly"
    }
  })
)



export const NavBar: React.FC<{}> = () => {

  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const menuItems = [
    { menuTitle: "Setup", pageURL: "/" },
    { menuTitle: "Play", pageURL: "/play" },
  ]


  const handleLoginOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setOpen(true)
  }
  const handleLoginClose = () => { setOpen(false) }

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <AppBar className={classes.root} position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Hanabi
            </Typography>
            {menuItems.map((item, idx) =>
              <Button key={idx} variant="contained" color="primary" component={RouterLink} to={item.pageURL}>{item.menuTitle}</Button>
            )}
            <IconButton color="inherit" aria-label="Edit">
              <SaveIcon />
            </IconButton>
            <Button onClick={handleLoginOpen} color="inherit">Login</Button>
          </Toolbar>
        </AppBar >
        <Switch>
          <Route path="/" exact render={() => <Setup />} />
          <Route path="/play" render={() => <Game />} />
        </Switch>
      </BrowserRouter>
      <LoginForm open={open} handleClose={handleLoginClose}></LoginForm>
    </div >
  )
}

// export default withRouter(NavBar)
