import React, { useImperativeHandle, useRef } from 'react'

import {
    DragSource,
    DropTarget,
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DropTargetConnector,
    DragSourceConnector,
    DragSourceMonitor,
} from 'react-dnd'

import { dndItemTypes } from './itemTypes'
import { XYCoord } from 'dnd-core'

const style: React.CSSProperties = {
    width: 100,
    border: '1px solid gray',
    backgroundColor: 'white',
    padding: '0.5rem 0.5rem',
    marginRight: '0.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}

import { CardColour, CardRank } from '../globalTypes'

interface CardDisplayProps {
    moveCard: (dragIndex: number, hoverIndex: number) => void
    index: number
    cardId: number
    colour : CardColour
    rank : CardRank
    isDragging: boolean
    connectDragSource: ConnectDragSource
    connectDropTarget: ConnectDropTarget
}

interface CardInstance {
    getNode(): HTMLDivElement | null
}

const CardDisplay = React.forwardRef<HTMLDivElement, CardDisplayProps>(
    ({ index, cardId, colour, rank , isDragging, connectDragSource, connectDropTarget }, ref) => {

        const elementRef = useRef(null)
        connectDragSource(elementRef)
        connectDropTarget(elementRef)

        const opacity = isDragging ? 0 : 1
        useImperativeHandle<{}, CardInstance>(ref, () => ({
            getNode: () => elementRef.current,
        }))
        return (
            <div ref={elementRef} style={{ ...style, opacity }}>
                {cardId} {colour} {rank}
            </div>
        )
    }
)

export default DropTarget(

    dndItemTypes.CARD,
    {
        hover(
            props: CardDisplayProps,
            monitor: DropTargetMonitor,
            component: CardInstance,
        ) {
            if (!component) {
                return null
            }
            // node = HTML Div element from imperative API
            const node = component.getNode()
            if (!node) {
                return null
            }

            const dragIndex = monitor.getItem().index
            const hoverIndex = props.index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = node.getBoundingClientRect()

            // Get horizontal middle
            const hoverMiddleX =
                (hoverBoundingRect.right - hoverBoundingRect.left) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the left
            const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                return
            }

            // Time to actually perform the action
            props.moveCard(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex
        },
    },
    (connect: DropTargetConnector) => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(
    DragSource(
        dndItemTypes.CARD,
        {
            beginDrag: (props: CardDisplayProps) => ({
                id: props.cardId,
                index: props.index,
            }),
        },
        (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    )(CardDisplay),
)
