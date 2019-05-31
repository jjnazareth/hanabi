import React from 'react'

import {
    DropTarget,
    ConnectDropTarget,
    DropTargetMonitor,
    DropTargetConnector,
} from 'react-dnd'
import { dndItemTypes } from './itemTypes'
import { TLSSocket } from 'tls';

const style: React.CSSProperties = {
    height: '12rem',
    width: '6rem',
    border: '1px solid gray',
    backgroundColor: 'red',
    padding: '0.5rem 0.5rem',
    marginRight: '0.5rem',
    marginBottom: '1.0rem',
    cursor: 'move',
    float: 'left',
}

export interface DiscardProps {
 
    canDrop: boolean
    isOver: boolean
    connectDropTarget: ConnectDropTarget
}

const Discards: React.FC<DiscardProps> = ({
  
    canDrop,
    isOver,
    connectDropTarget,
}) => {
    
    const isActive = canDrop && isOver
    let backgroundColor = 'seagreen'
    if (isActive) {
        backgroundColor = 'darkyellow'
    } else if (canDrop) {
        backgroundColor = 'darkkhaki'
    }

    return (
        <div ref={connectDropTarget} style={{ ...style, backgroundColor }}>
            {isActive ? 'Release to Place' : 'Done' }
          
        </div>
    )
}

export default DropTarget(
    
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
)(Discards)

