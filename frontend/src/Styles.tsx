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
    padding: 0,
    border: 1,
    spacing: 0,
    backgroundColor: "#F0F4C3"
  },
  buildCards: {
    margin: 0,
    padding: 0,
    border: 1,
    spacing: 0,
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
    height: 200,
    width: 70,
  },
  gameState: {
    margin: 0,
    padding: 2,
    flexDirection: 'row',
    border: 1,
    spacing: 0 ,
    backgroundColor: "#C5E1A5"
  },
  background: {
    margin: 0,
    padding: 2,
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
    // width: 800,
  }, 
  card: {
    border: '1px solid grey',
    position: "relative",
    height: 95,
    width: 70,
  },
  cardIdx : {
    position: "absolute", left: "2px"
  },
  cardRankTop : {
    position: "absolute", right: "2px" 
  },
  cardRankMid : {
    position: "absolute", top: "20px", left: "20px",
  },
  cardNo : {
    position: "absolute", bottom: "0px", right: "2px" 
  },
  cardDeck : {
    paddingTop: 20,
  },
  buildArea: {
    marginTop: 0,
    border: '1px solid grey',
    paddingRight: 10,
    textAlign: 'left',
    color: 'black',
    height: 250,
    // width: 500,
  },
  discardArea: {
    marginTop: 0,
    border: '1px solid grey',
    paddingRight: 10,
    textAlign: 'left',
    color: 'black',
    height: 350,
    // width: 500,
  },
 
})

export default withStyles(styles) 
