import React, { useEffect, useContext, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { MemberBoard } from './MemberBoard'
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core'
import { IGlobalState } from '../../reducers'
import { IRegisterState } from '../../reducers/register/register.reducer'
import { FirebaseContext } from '../../firebase/firebase'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    playerBoard: {
      margin: 4,
      padding: 2,
      spacing: theme.spacing(2),
      backgroundColor: "#C5E1A5"
    },
  })
)


interface IProps {
  register: IRegisterState
}

export const _SeatPlayers: React.FC<IProps> = ({ register }) => {
  const classes = useStyles()
  const { app, api } = useContext(FirebaseContext)
  // const members = useSelector<IGlobalState, Member[]>(state => state.register.members)
  const members = register.members
  const playMembers = members.slice(3, 8)

  useEffect(() => {
    // initialise redux store from firestore/real database
    console.log("In useEffect")
    console.log(members)
    api && api.readMembers()
    return () => {
      console.log(members)
    }
  }, [])

  return (
    <>
      <Grid container direction="column" className={classes.playerBoard} >
        <h2>Seat Players</h2>
        <MemberBoard items={playMembers}></MemberBoard>
      </Grid>
    </>
  )
}

const mapStateToProps = (state: IGlobalState) => ({
  register: state.register,
})

export const SeatPlayers = connect(mapStateToProps, {})(_SeatPlayers)
