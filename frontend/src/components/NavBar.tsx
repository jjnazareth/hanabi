import React, { useState, ChangeEvent } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button, makeStyles, Theme, createStyles, useTheme, Menu } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SaveIcon from "@material-ui/icons/Save"

import { LoginForm } from './login/LoginForm'
import { Container } from './Container'
import { withRouter } from "react-router-dom"

import { Home } from "./Home"
import { Contact } from "./Contact"
import { About } from "./About"

import { Route, Switch } from "react-router-dom"

import MenuItem from "@material-ui/core/MenuItem"
import useMediaQuery from "@material-ui/core/useMediaQuery"


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

interface IProps {
}

export const NavBar: React.FC<IProps> = (props) => {

  const classes = useStyles()
  // const { history } = props
  // const [open, setOpen] = useState({ login: false, setup: false, play: false })
  // const [value, setValue] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }


  const handleButtonClick = (pageURL: any) => {
    // history.push(pageURL)
  }

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/"
    },
    {
      menuTitle: "Contact",
      pageURL: "/contact"
    },
    {
      menuTitle: "About",
      pageURL: "/about"
    }
  ]


  // const handleLoginOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   event.preventDefault()
  //   setOpen({ ...open, login: true })
  // }
  // const handleSetup = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   event.preventDefault()
  //   setOpen({ ...open, setup: true, play: false })
  // }
  // const handlePlay = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   event.preventDefault()
  //   setOpen({ ...open, setup: false, play: true })
  // }

  // const handleLoginClose = () => { setOpen({ ...open, login: false }) }

  // const handleClick = () => { alert("Hello") }

  return (
    <div className={classes.root}>
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton edge="start" onClick={handleMenu} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <div className={classes.headerOptions}>
            <Button variant="contained" onClick={() => handleButtonClick("/")} >
              HOME
            </Button>
            <Button variant="contained" onClick={() => handleButtonClick("/contact")}>
              CONTACT
            </Button>
            <Button variant="contained" onClick={() => handleButtonClick("/about")} >
              ABOUT
            </Button>
          </div>
          <Typography variant="h6" className={classes.title}>
            Hanabi
          </Typography>
          {/* <Button onClick={handleSetup} color="inherit">Setup</Button>
          <Button onClick={handlePlay} color="inherit">Play</Button>
          <IconButton color="inherit" aria-label="Edit">
            <SaveIcon />
          </IconButton>
          <Button onClick={handleLoginOpen} color="inherit">Login</Button> */}

          {/* </section> */}
        </Toolbar>
      </AppBar >

      {/* <LoginForm open={open.login} handleClose={handleLoginClose}></LoginForm>
      {open.setup && "Setup"}
      {open.play && <Container></Container>} */}
    </div >
  )
}

export default withRouter(NavBar)
