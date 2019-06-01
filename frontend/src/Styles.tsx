import React from 'react'
import { compose } from 'redux'
import { withStyles, createStyles } from '@material-ui/core'
import { Grid, Paper, Typography, Theme, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { Button } from '@material-ui/core'

export const styles = (theme: Theme) => createStyles({
  root: {
  },
  hand: {
    margin: 0,
    padding: 4,
    border: 1,
    spacing: 2,
    backgroundColor: "lightBlue"
  },
  gameState: {
    margin: 0,
    padding: 8,
    flexDirection: 'row',
    border: 1,
    spacing: 0 ,
    backgroundColor: "yellow"
  },
  game: {
    margin: 0,
    padding: 8,
    maxWidth: "sm",
    flexDirection: 'row',
    border: 1,
    spacing: 0 ,
    backgroundColor: "lightGrey"
  },
  table: {
    margin: 0,
    padding: 12,
    // maxWidth: "sm",
    flexDirection: 'row',
    border: 1,
    spacing: 0,
    backgroundColor: "green"
  },
  card: {
    border: '1px solid grey',
    padding: 4,
    textAlign: 'left',
    color: 'black',
    backgroundColor: 'white',
    height: 100,
    width: 75,
  },
  discardStack: {
    border: '1px solid grey',
    padding: 4,
    flexDirection: 'column',
    spacing: 2,
    textAlign: 'left',
    color: 'black',
    // backgroundColor: 'blue', colour given by drag and drop
    height: 300,
    width: 400,
  }
})

export default withStyles(styles) 
