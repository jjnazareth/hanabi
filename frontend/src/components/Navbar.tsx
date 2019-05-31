import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import 'typeface-roboto'

const NavBar = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          React  Material-UI Sample Application
        </Toolbar>
      </AppBar>
      {/* <Typography  color="inherit">Some text in here</Typography> */}
    </div>
  )
}

export default NavBar;