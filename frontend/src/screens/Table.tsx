import React from 'react'

import { Grid, WithStyles } from '@material-ui/core'

import { styles } from '../Styles'
import { withStyles } from '@material-ui/core'
import 'typeface-roboto'

import Discards from './Discards'
import BuildPile from './BuildPile'
import {
    DropTarget,
    ConnectDropTarget,
    DropTargetMonitor,
    DropTargetConnector,
} from 'react-dnd'
import { dndItemTypes } from './itemTypes'

export interface TableProps extends WithStyles<typeof styles> {
    canDrop: boolean
    isOver: boolean
    connectDropTarget: ConnectDropTarget
}

const Table: React.FC<TableProps> = ({
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
            <Grid container xs={12} direction="column" justify="space-around"
                alignItems="center" >
                <br />
                <Grid item xs={12}>
                    <BuildPile />
                </Grid>
                <br/>
                <Grid item xs={12}>
                    <Discards />
                </Grid>

            </Grid>
        </div >
    )
}

const table = DropTarget(

    dndItemTypes.CARD,
    {
        /* drop: ((props: TableEdgeProps, monitor) => { 
            alert (JSON.stringify(monitor.getItem()))
        }) */
    },

    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),

    }),
)(Table)

export default withStyles(styles)(table)