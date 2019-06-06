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

export interface BuildAreaProps extends WithStyles<typeof styles> {
    numPlayers : number
    setNextTurn: (numPlayers: number) => (void)
    canDrop: boolean
    isOver: boolean
    connectDropTarget: ConnectDropTarget
}

const BuildArea: React.FC<BuildAreaProps> = ({
    numPlayers,
    setNextTurn,
    canDrop,
    isOver,
    connectDropTarget,
    classes
}) => {

    const isActive = canDrop && isOver
    let colour = isActive?'#AED581': '#DCEDC8'
    
    return (
        <div ref={connectDropTarget} className = {classes.buildArea} style={{ backgroundColor : colour }}>
            <h3>{isActive ? 'Release to Place' : 'Build Pile' }</h3>
        </div>
    )
}

const buildArea =  DropTarget(

    dndItemTypes.CARD,
    {
        drop: ((props: BuildAreaProps, monitor) => { 
            const {setNextTurn, numPlayers} = props
            alert (JSON.stringify(monitor.getItem()))
            setNextTurn(numPlayers)
        }),
        canDrop: ((props: BuildAreaProps, monitor)  => {
            return monitor.getItem().isTurn
        })
    },
 
    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        
    }),
) (BuildArea)

export default withStyles(styles) (buildArea)