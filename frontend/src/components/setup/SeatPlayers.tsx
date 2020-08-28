import React, { useEffect, useContext, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { MemberBoard } from './MemberBoard'
import { makeStyles, Theme, createStyles, Grid, Button } from '@material-ui/core'
import { IGlobalState } from '../../reducers'
import { IRegisterState } from '../../reducers/register/register.reducer'
import { FirebaseContext } from '../../firebase/firebase'
import { Member } from '../../globalTypes'

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
  // const [selMembers, setSelMembers] = useState<Member[]>([])

  // initialise redux store from firestore/real database
  const selMembers =
    [
      { playerId: 1, userName: "Alpha", password: "", isLoggedIn: false },
      { playerId: 2, userName: "Beta", password: "", isLoggedIn: false },
      { playerId: 3, userName: "Gamma", password: "", isLoggedIn: false },
      { playerId: 4, userName: "Delta", password: "", isLoggedIn: false },
      { playerId: 5, userName: "Epsilon", password: "", isLoggedIn: false },
    ]

  useEffect(() => {
    // api && api.readMembers()
    return () => {
    }
  }, [])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  }

  return (
    <>
      <Grid container direction="column" className={classes.playerBoard} >
        <h2>Seat Players</h2>
        <MemberBoard memberItems={selMembers} />
      </Grid>
    </>
  )
}

const mapStateToProps = (state: IGlobalState) => ({
  register: state.register,
})

export const SeatPlayers = connect(mapStateToProps, {})(_SeatPlayers)
