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
    let colour = isActive?'#FF7043':'#FCE4EC'
    
    return (
        <div ref={connectDropTarget} className = {classes.discards}
            style={{ backgroundColor : colour }}>
            <h3>{isActive ? 'Release to Discard' : 'Discards' }</h3>
        </div>
    )
}

const discards =  DropTarget(
    
    dndItemTypes.CARD,
    {
        drop: ((props: DiscardProps, monitor) => { 
            alert (JSON.stringify(monitor.getItem()))
        }),
        canDrop: ((props: DiscardProps, monitor)  => {
            return monitor.getItem().isTurn
        })
    },
 
    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        
    }),
) (Discards)

export default withStyles(styles) (discards)