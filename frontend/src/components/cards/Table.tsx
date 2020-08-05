import React from 'react'
import { connect } from 'react-redux'
import BuildArea from './BuildArea'
import DiscardArea from './DiscardArea'
import { setNextTurn } from '../../actions'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'
import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetConnector } from 'react-dnd'
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

interface TableProps {
  numPlayers: number
  setNextTurn: () => void
  canDrop: boolean
  isOver: boolean
  handleAllowRearrange: (allowArrange: boolean) => void
  connectDropTarget: ConnectDropTarget
}

const Table: React.FC<TableProps> = ({ numPlayers, setNextTurn, canDrop, isOver, handleAllowRearrange, connectDropTarget, }) => {
  const isActive = canDrop && isOver
  const classes = useStyles({ isActive })
  // inhibit dispatch to redux store, as the mouse pointer is outside
  // the area where cards are being rearranged in one hand
  handleAllowRearrange(false)
  let colour = isActive ? '#FFC400' : ""

  return (
    // <div ref={connectDropTarget}>
    <Grid ref={connectDropTarget} container direction="column" justify="space-around"
      alignItems="center" className={classes.table}>
      <Grid item >
        <BuildArea setNextTurn={setNextTurn} />
      </Grid>
      <Grid item >
        <DiscardArea setNextTurn={setNextTurn} />
      </Grid>
    </Grid>
    // </div >
  )
}

const table = DropTarget(
  dndItemTypes.CARD,
  {
    drop: ((props: TableProps, monitor) => {

    }),
    canDrop: ((props: TableProps, monitor) => {
      return monitor.getItem().isTurn
    })
  },

  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(Table)


export default connect(null, { setNextTurn })(table)