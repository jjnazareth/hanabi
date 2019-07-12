import React from 'react';
import { Link } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { styles } from '../Styles'
import { Grid, WithStyles, Button } from '@material-ui/core'
import IconButton from '@material-ui/core/Icon'
import AccountCircle from '@material-ui/core/Icon'
import { Menu, MenuItem, MenuList } from '@material-ui/core'

interface NavBarProps extends WithStyles<typeof styles> {

}

const NavBar: React.FC<NavBarProps> =
  ({ classes }) => {
    const handleMenu = () => { }
    const anchorEl = () => { }
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
export default withStyles(styles)(NavBar)