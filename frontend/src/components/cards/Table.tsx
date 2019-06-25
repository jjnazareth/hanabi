import React from 'react'
import { connect } from 'react-redux'
import { IRoomState } from '../../reducers/room/room.reducer'
import { IGlobalState } from '../../reducers'
import BuildArea from './BuildArea'
import DiscardArea from './DiscardArea'
import { CardRearrangeUpdate } from '../../components/Game'
import { setNextTurn } from '../../actions';

import 'typeface-roboto'
import { Grid, WithStyles, withStyles } from '@material-ui/core'
import { styles } from '../../Styles'

import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector,
} from 'react-dnd'
import { dndItemTypes } from './itemTypes'

export interface TableProps extends WithStyles<typeof styles> {
  room: IRoomState
  setNextTurn: (numPlayers: number) => (void)
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const Table: React.FC<TableProps> = ({
  room,
  setNextTurn,
  canDrop,
  isOver,
  connectDropTarget,
  classes
}) => {

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
          <BuildArea setNextTurn={setNextTurn} numPlayers={room.players.length} />
        </Grid>
        <br />
        <Grid item xs={12}>
          <DiscardArea setNextTurn={setNextTurn} numPlayers={room.players.length} />
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

const mapStateToProps = (state: IGlobalState) => ({
  room: state.room,
})

export default connect(mapStateToProps, { setNextTurn })(withStyles(styles)(table))