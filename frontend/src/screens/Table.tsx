import React from 'react'
import { connect } from 'react-redux'
import { Grid, WithStyles } from '@material-ui/core'
import { IRoomState } from '../reducers/room/room.reducer'
import { IGlobalState } from '../reducers'
import { setNextTurn } from '../reducers/game/game.actions';
import { styles } from '../Styles'
import { withStyles } from '@material-ui/core'
import 'typeface-roboto'

import BuildArea from './BuildArea'
import Discards from './Discards'

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
    const isActive = canDrop && isOver
    let colour = isActive ? '#FFC400' : ""

    return (
        <div ref={connectDropTarget} className={classes.table}
            style={{ backgroundColor: colour }}>
            <Grid container direction="column" justify="space-around"
                alignItems="center" >
                <br />
                <Grid item xs={12}>
                    <BuildArea setNextTurn = {setNextTurn} numPlayers={room.players.length} />
                </Grid>
                <br/>
                <Grid item xs={12}>
                    <Discards setNextTurn = {setNextTurn} numPlayers={room.players.length} />
                </Grid>

            </Grid>
        </div > 
    )
}

const table = DropTarget(

    dndItemTypes.CARD,
    {
        drop: ((props: TableProps, monitor) => { 
            // alert (JSON.stringify(monitor.getItem()))
        }),
        canDrop: ((props: TableProps, monitor)  => {
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
  

export default connect(mapStateToProps, {setNextTurn}) (withStyles(styles)(table))