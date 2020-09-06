import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { MemberBoard } from './MemberBoard'
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core'
import { IGlobalState } from '../../reducers'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

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
  members: any
}

export const _SeatPlayers: React.FC<IProps> = ({ members }) => {
  const classes = useStyles()
  const selMembers =
    [
      { playerId: 1, userName: "Alpha", password: "", isLoggedIn: false },
      { playerId: 2, userName: "Beta", password: "", isLoggedIn: false },
      { playerId: 3, userName: "Gamma", password: "", isLoggedIn: false },
      { playerId: 4, userName: "Delta", password: "", isLoggedIn: false },
      { playerId: 5, userName: "Epsilon", password: "", isLoggedIn: false },
    ]

  useEffect(() => {
    return () => {
    }
  }, [])


  return (
    <>
      {console.log(members)}
      <Grid container direction="column" className={classes.playerBoard} >
        <h2>Seat Players</h2>
        <MemberBoard memberItems={members ? members : selMembers} />
      </Grid>
    </>
  )
}

const mapStateToProps = (state: IGlobalState) => {
  console.log(state)
  return {
    members: state.firestore.ordered.users,
    // register: state.register,
  }
}
export const SeatPlayers = compose<React.FC>(
  connect(mapStateToProps, {}),
  firestoreConnect([{ collection: "users" }])
)(_SeatPlayers)

