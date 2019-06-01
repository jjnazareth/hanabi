import React from 'react'
import { withStyles } from '@material-ui/core'
import { Grid, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'

import {
    DropTarget,
    ConnectDropTarget,
    DropTargetMonitor,
    DropTargetConnector,
} from 'react-dnd'
import { dndItemTypes } from './itemTypes'
import { TLSSocket } from 'tls';

export interface DiscardProps extends WithStyles<typeof styles> { 
    canDrop: boolean
    isOver: boolean
    connectDropTarget: ConnectDropTarget
}

const Discards: React.FC<DiscardProps> = ({
    canDrop,
    isOver,
    connectDropTarget,
    classes
}) => {

    const isActive = canDrop && isOver
    let colour = 'blue'
    if (isActive) {
        colour = 'green'
    } else if (canDrop) {
        colour = 'yellow'
    }

    return (
        <div ref={connectDropTarget} className = {classes.discardStack} style={{ backgroundColor : colour }}>
            {isActive ? 'Release to Place' : 'BUILD PILE' }
        </div>
    )
}

const buildPile =  DropTarget(

    dndItemTypes.CARD,
    {
        drop: ((props: DiscardProps, monitor) => { 
            alert (JSON.stringify(monitor.getItem()))
        })
    },
 
    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        
    }),
) (Discards)

export default withStyles(styles) (buildPile)