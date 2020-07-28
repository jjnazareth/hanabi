import React from 'react'
import { connect } from 'react-redux'
import BuildArea from './BuildArea'
import DiscardArea from './DiscardArea'
import { CardRearrangeUpdate } from '../../components/Game'
import { setNextTurn } from '../../actions'

import 'typeface-roboto'
import { Grid } from '@material-ui/core'
import { useStyles } from '../../Styles'

import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector,
} from 'react-dnd'
import { dndItemTypes } from './itemTypes'

export interface TableProps {
  numPlayers: number
  setNextTurn: (numPlayers: number) => (void)
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const Table: React.FC<TableProps> = ({
  numPlayers,
  setNextTurn,
  canDrop,
  isOver,
  connectDropTarget,

}) => {
  const classes = useStyles()
  // inhibit update of card rearrangement
  CardRearrangeUpdate.toUpdate = false

  const isActive = canDrop && isOver
  let colour = isActive ? '#FFC400' : ""

  return (
    <div ref={connectDropTarget} className={classes.table}
      style={{ backgroundColor: colour }}>
      <Grid container direction="column" justify="center"
        alignItems="center" >
        <br />
        <Grid item xs={12}>
          <BuildArea setNextTurn={setNextTurn} numPlayers={numPlayers} />
        </Grid>
        <br />
        <Grid item xs={12}>
          <DiscardArea setNextTurn={setNextTurn} numPlayers={numPlayers} />
        </Grid>
      </Grid>
    </div >
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