import React, { useState, ChangeEvent } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button, makeStyles, Theme, createStyles, useTheme, Menu } from '@material-ui/core'
import SaveIcon from "@material-ui/icons/Save"
import { Link as RouterLink, withRouter, BrowserRouter } from "react-router-dom"

import { Route, Switch } from "react-router-dom"
import { Game } from './Game'
import { SeatPlayers } from './setup/SeatPlayers'
import { RegisterActionNames } from '../reducers/register/register.actions.type'
import { RegisterForm } from './login/RegisterForm'

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
    { menuTitle: "Seating", pageURL: "/seating" },
    { menuTitle: "Play", pageURL: "/play" },
    { menuTitle: "Login", pageURL: "/login" },
    { menuTitle: "Logout", pageURL: "/logout" },
    { menuTitle: "Register", pageURL: "/register" }
  ]

  const handleRegisterOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    setOpen(true)
  }
  const handleRegisterClose = () => { setOpen(false) }

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
          </Toolbar>
        </AppBar >
        <Switch>
          <Route path="/" exact /* render={() => <SeatPlayers />} */ />
          <Route path="/seating" exact render={() => <SeatPlayers />} />
          <Route path="/play" render={() => <Game />} />
          <Route path="/register" render={() => <RegisterForm />} />
        </Switch>
      </BrowserRouter>

    </div >
  )
}

// export default withRouter(NavBar)
