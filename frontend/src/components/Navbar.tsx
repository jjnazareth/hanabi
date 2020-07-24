import React from 'react'
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { Typography } from '@material-ui/core'
import { useStyles } from '../Styles'
import { MenuItem, MenuList } from '@material-ui/core'

interface NavBarProps {

}

const NavBar: React.FC<NavBarProps> = () => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position="static">
        <Typography /* type="title"  */ color="inherit" className={classes.root}>
          React Material UI Example
        </Typography>
        <MenuList>
          <MenuItem component={Link} to="/">
            Home
          </MenuItem>
          <MenuItem component={Link} to="/">
            Writers
          </MenuItem>
        </MenuList>
        <Toolbar>

        </Toolbar>
      </AppBar>
    </div>
  )
}
export default (NavBar)