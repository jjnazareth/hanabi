import React from 'react'

import {
    DragSource,
    DragSourceMonitor,
    ConnectDragSource,
    DragSourceConnector,
} from 'react-dnd'

import { dndItemTypes } from './itemTypes'


const style: React.CSSProperties = {
    border: '1px solid gray',
    backgroundColor: 'white',
    padding: '1.5rem 1rem',
    marginRight: '2.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

import { Card } from '../globalTypes'

interface CardProps {
    card : Card
    isDragging: boolean
    connectDragSource: ConnectDragSource
}

const CardDisplay: React.FC<CardProps> = ({ card, isDragging, connectDragSource }) => {
    const opacity = isDragging ? 0.4 : 1
    return (
        <div ref={connectDragSource} style={{ ...style, opacity }}>
            {card.idx} {card.colour} {card.rank}
        </div>
    )
}


export default DragSource(

    dndItemTypes.BOX,
    {
        beginDrag: (props: CardProps) => ({ name: props.card.idx }),
        endDrag(props: CardProps, monitor: DragSourceMonitor) {
            const item = monitor.getItem()
            const dropResult = monitor.getDropResult()

            if (dropResult) {
                alert(`You dropped ${item.name}  into ${dropResult.name}!`)
            }
        },
    },
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }),
)(CardDisplay)
