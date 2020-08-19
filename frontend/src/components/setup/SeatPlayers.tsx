import React from 'react'
import { connect } from 'react-redux'
import { PlayerBoard } from './PlayerBoard'
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core'
import { IGlobalState } from '../../reducers'
import { IRegisterState } from '../../reducers/register/register.reducer'


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
  const players = [...register.members.slice(0, 5)]
  console.log(players)
  return (
    <>
      <Grid container direction="column" className={classes.playerBoard} >
        <h1>Arrange Players</h1>
        <PlayerBoard items={players}></PlayerBoard>
      </Grid>
    </>
  )
}

const mapStateToProps = (state: IGlobalState) => ({
  register: state.register,
})

export const SeatPlayers = connect(mapStateToProps, {})(_SeatPlayers)
