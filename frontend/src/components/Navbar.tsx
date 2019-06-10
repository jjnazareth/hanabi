import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core'
import { styles } from '../Styles'
import { Grid, WithStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/Icon'
import AccountCircle from '@material-ui/core/Icon'
import {Menu }from '@material-ui/core'

interface NavBarProps extends WithStyles<typeof styles> {

}

const NavBar: React.FC<NavBarProps> =
  ({ classes }) => {
    const handleMenu = () => {}
    const anchorEl = () => {}
    return (
      <div>
        <AppBar position="static">
          <Typography /* type="title"  */ color="inherit" className={classes.root}>
            React Material UI Example
            </Typography>
          
          <Toolbar>

          </Toolbar>
        </AppBar>
      </div>
    )
  }
export default withStyles(styles)(NavBar)