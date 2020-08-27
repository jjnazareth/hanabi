import React from 'react'
import { connect } from 'react-redux'
import { BuildArea2 } from './BuildArea2'
import { DiscardArea2 } from './DiscardArea2'
import { setNextTurn } from '../../actions'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'
import { useDrop } from 'react-dnd'
import { dndItemTypes } from './itemTypes'


interface IStyleProps {
  isActive: boolean
}
const useStyles = makeStyles<Theme, IStyleProps>((theme: Theme) =>
  createStyles({
    table: ({ isActive }) => ({
      margin: 4,
      padding: 2,
      spacing: theme.spacing(2),
      width: 600,
      height: 680,
      backgroundColor: isActive ? '#FFC400' : 'lightBlue',
    }),
  })
)

interface IProps {
  numPlayers: number
  setNextTurn: () => void
}

const _PlayBorder: React.FC<IProps> = ({ numPlayers, setNextTurn }) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: dndItemTypes.CARD,
    drop: () => ({}),
    canDrop: ((item, monitor) => {
      // console.log("Monitor item: ", monitor.getItem())
      return monitor.getItem().isTurn
    }),

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  const classes = useStyles({ isActive })
  let colour = isActive ? '#FFC400' : ""

  return (
    <Grid ref={drop} container direction="column" justify="space-around"
      alignItems="center" className={classes.table}>
      <Grid item >
        <BuildArea2 setNextTurn={setNextTurn} />
      </Grid>
      <Grid item >
        <DiscardArea2 setNextTurn={setNextTurn} />
      </Grid>
    </Grid>
  )
}

export const PlayBorder2 = connect(null, { setNextTurn })(_PlayBorder)

