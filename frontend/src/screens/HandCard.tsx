import React, { useImperativeHandle, useRef } from 'react'

import { Paper, Grid, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'
import { Typography } from '@material-ui/core'
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
import { withStyles, ThemeProvider } from '@material-ui/styles';
import { Subheader } from 'material-ui';


interface HandDisplayProps extends WithStyles<typeof styles> {
  moveCard: (dragIndex: number, hoverIndex: number) => void
  dropCard: () => (void)
  holder: Player
  index: number
  numCards: number
  card: Card
  isTurn: boolean
  isDragging: boolean
  connectDragSource: ConnectDragSource
  connectDropTarget: ConnectDropTarget
}

interface CardInstance {
  getNode(): HTMLDivElement | null
}



const HandCard = React.forwardRef<HTMLDivElement, HandDisplayProps>(
  ({ classes, card, index, isTurn, numCards, isDragging,
    connectDragSource, connectDropTarget }, ref) => {

    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)

    const opacity = isDragging ? 0.4 : 1
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))
   
    if (isTurn)
      return (
        <Paper className={classes.card} ref={elementRef}
          style={{ opacity: opacity, background: "lightGrey" }} >
          <div className={classes.cardIdx}>
            <Typography variant="caption" > {numCards - index}</Typography>
          </div>
        </Paper>
      )
    else
      return (
        <Paper className={classes.card} ref={elementRef}
          style={{
            opacity: opacity,
            background:
              card.colour.name == "Multi" ?
                'linear-gradient(to right bottom, #FFCC66, #9900FF)' : card.colour.code
          }}>

          <div className={classes.cardIdx}>
            <Typography variant="caption" > {index + 1}</Typography>
          </div>
          <div className={classes.cardRankTop}>
            <Typography variant="h6"> <Typography variant="h6"> {card.rank}</Typography></Typography>
          </div>
          <div className={classes.cardRankMid}>
            <Typography variant="h2"> {card.rank}</Typography>
          </div>
          <div className={classes.cardNo}>
            <Typography variant="caption" >{card.idx}</Typography>
          </div>
        </Paper>
      )
  }
)

const handCard = DropTarget(
  dndItemTypes.CARD,
  {
    hover(
      props: HandDisplayProps,
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
    drop: ((props, monitor) => {
      /* 
       do not use this to find the final position of the card as
       it will not fire if dropped in the space between cards
     */
    }),
  },
  (connect: DropTargetConnector) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    dndItemTypes.CARD,
    {
      beginDrag: (props: HandDisplayProps) => ({
        card: props.card,
        index: props.index,
        holder: props.holder,
        isTurn: props.isTurn
      }),
      endDrag(props, monitor, component) {
        props.dropCard()
      }
    },
    // collecting function
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(HandCard),
)

export default withStyles(styles)(handCard)