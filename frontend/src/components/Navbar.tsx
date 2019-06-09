import React from 'react'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Tabs, Tab } from '@material-ui/core'
import 'typeface-roboto'
import { withStyles } from '@material-ui/core'
import { Grid, WithStyles } from '@material-ui/core'
import { styles } from '../Styles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'

//export interface BuildDndProps extends WithStyles<typeof styles> {
import MenuIcon from '@material-ui/icons/Menu'
export interface INavbar extends WithStyles<typeof styles> {

}

const Navbar: React.FC<WithStyles> = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Hanabi
          </Typography>
          <Menu
         /*  id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          
          onClose={handleClose} */
          open={Boolean(anchorEl)}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
       
          </Toolbar>
        
        
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Navbar);