import React from 'react'
import { withStyles, createStyles, Theme, createMuiTheme } from '@material-ui/core'
import ThemeProvider from "@material-ui/core"
import 'typeface-roboto'


export const styles = (theme : Theme) => createStyles({
  root: {
    
    margin: 0,
    padding:0,
    minHeight: 0,
    minWidth: 0,
    
  },
  hand: {
    margin: 0,
    padding: 4,
    border: 1,
    spacing: 0,
    backgroundColor: "#F0F4C3"
  },
  gameState: {
    margin: 0,
    padding: 8,
    flexDirection: 'row',
    border: 1,
    spacing: 0 ,
    backgroundColor: "#C5E1A5"
  },
  background: {
    margin: 0,
    padding: 8,
    flexDirection: 'row',
    border: 1,
    spacing: 0 ,
    backgroundColor: "lightGrey"
  },
  table: { 
    border: 0,
    spacing: 0,
    backgroundColor: "lightGrey",
    height: "100%",
    width: 800,
  }, 
  card: {
    border: '1px solid grey',
    padding: 3,
   
    textAlign: 'left',
    color: 'black',
    height: 90,
    width: 70,
    
  },
  buildPile: {
    marginTop: 0,
    border: '1px solid grey',
    padding: 4,
    textAlign: 'center',
    color: 'black',
    height: 200,
    width: 700,
  },
  discards: {
    marginTop: 0,
    border: '1px solid grey',
    padding: 4,
    textAlign: 'center',
    color: 'black',
    height: 400,
    width: 700,
  },
  button: {
    margin: 1,
  },
})

export default withStyles(styles) 
