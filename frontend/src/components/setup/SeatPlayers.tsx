import React, { useState, useEffect, SetStateAction } from 'react'
import { connect } from 'react-redux'
import { PlayerBoard } from './PlayerBoard'
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core'
import { IGlobalState } from '../../reducers'
import { IRegisterState } from '../../reducers/register/register.reducer'
// import { listUsers, countUsers, getUsers } from '../Test/AddMembers'

import firebase from "../Test/firebase"


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

const _SeatPlayers: React.FC<IProps> = ({ register }) => {
  const classes = useStyles()
  const [players, setPlayers] = useState<any>(0)

  useEffect(() => {
  }, [])

  return (
    <>
      <Grid container direction="column" className={classes.playerBoard} >
        <h2>Seat Players</h2>
        {/* <PlayerBoard items={players}></PlayerBoard> */}
      </Grid>
    </>
  )
}

const mapStateToProps = (state: IGlobalState) => ({
  register: state.register,
})

export const SeatPlayers = connect(mapStateToProps, {})(_SeatPlayers)
