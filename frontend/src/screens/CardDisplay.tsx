import React, { useImperativeHandle, useRef } from 'react'

import { Paper, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'
import { Card, Player } from '../globalTypes' 

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

import { CardColour, CardRank } from '../globalTypes'
import { withStyles } from '@material-ui/styles';


interface CardDisplayProps extends WithStyles<typeof styles> {
  moveCard: (dragIndex: number, hoverIndex: number) => void
  holder: Player
  index: number
  // cardId: number
  // colour: CardColour
  // rank: CardRank
  card : Card
  isTurn: boolean
  isDragging: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
}

interface CardInstance {
  getNode(): HTMLDivElement | null
}

const CardDisplay = React.forwardRef<HTMLDivElement, CardDisplayProps>(
  ({ classes, card, isTurn,  isDragging, connectDragSource, connectDropTarget }, ref) => {

    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)

    const opacity = isDragging ? 0. : 1
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))
    return (
      <Paper className={classes.card} ref={elementRef} style={{ opacity }} >
        {card.idx} {card.colour} {card.rank}
      </Paper>
    )
  }
)

const cardDisplay = DropTarget(
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

      // Only perform the move when the mouse has crossed half of the items width
      // When dragging leftwards, only move when the cursor is below 50%
      // When dragging rightwards, only move when the cursor is above 50%

      // Dragging leftwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }

      // Dragging rightwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return
      }
      // cards should be exchanged in one hand only
      if (!(monitor.getItem().holder == props.holder)) {
        return
      }

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
        card: props.card,
        index: props.index,
        holder: props.holder,
        isTurn: props.isTurn
      }),
      endDrag(props, monitor, component) {
      }
    },
    // collecting function
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(CardDisplay),
)

export default withStyles(styles)(cardDisplay)