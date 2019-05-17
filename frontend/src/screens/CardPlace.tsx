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

export interface CardPlaceProps {
    place: string
    canDrop: boolean
    isOver: boolean
    connectDropTarget: ConnectDropTarget
}

const CardPlace: React.FC<CardPlaceProps> = ({
    place,
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
            {isActive ? 'Release to Place' : 'P' + place }
        </div>
    )
}

export default DropTarget(
    
    dndItemTypes.BOX,
    {
        drop: (props: CardPlaceProps, monitor) => ({ name : props.place}),
    },
 
    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        
    }),
)(CardPlace)

