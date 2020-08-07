import React from 'react'
import { makeStyles, createStyles, Theme, createMuiTheme } from '@material-ui/core'
import ThemeProvider from "@material-ui/core"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      margin: 0,
      padding: 0,
      minHeight: 0,
      minWidth: 0,
    },
    title: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hand: {
      margin: 0,
      padding: 0,
      border: 1,
      spacing: 0,
      backgroundColor: "#F0F4C3"
    },
    deck: {
      margin: 0,
      padding: 0,
      border: 1,
      spacing: 0,
      backgroundColor: "lightGrey" //"#ECD3CA"
    },
    discardPile: { // used for build also
      position: "relative",
      width: 70,
      height: 200,
    },
    card: {
      border: '1px solid grey',
      position: "relative",
      height: 95,
      width: 70,
    },
    cardDeck: {
      paddingTop: 20,
    },
    icon: {
      margin: theme.spacing(1),
    },
    group: {
      margin: theme.spacing(1, 0),
    },
    button: {
      textTransform: "none",
      margin: 0,
      padding: 0,
      minHeight: 0,
      minWidth: 0,
    }
  })
)
