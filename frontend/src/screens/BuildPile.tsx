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
    let colour = isActive?'#AED581': '#DCEDC8'
    
    return (
        <div ref={connectDropTarget} className = {classes.buildPile} style={{ backgroundColor : colour }}>
            <h3>{isActive ? 'Release to Place' : 'Build Pile' }</h3>
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