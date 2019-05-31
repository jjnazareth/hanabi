import React from 'react'
import { compose } from 'redux'
import { withStyles, createStyles } from '@material-ui/core'
import { Grid, Paper, Typography, Theme, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { Button } from '@material-ui/core'

export const styles = (theme: Theme) => createStyles({
  root: {
    margin: 0,
    padding: 8,
    maxWidth: 650,
    flexDirection: 'row',
    border: 1,
    spacing: 0,
    backgroundColor: "lightGreen"
  },
  paper: {
    // marginRight: '0.5rem',
    // marginBottom: '0.5rem',
    border: '1px solid grey',
    padding: 0,
    textAlign: 'left',
    color: 'black',
    backgroundColor: 'orange',
    height: 200,
    width: 140,
  },
})

export default withStyles(styles) 
