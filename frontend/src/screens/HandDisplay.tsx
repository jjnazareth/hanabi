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

const HandDisplay = React.forwardRef<HTMLDivElement, HandDisplayProps>(
  ({ classes, card, index, isTurn, numCards, isDragging, 
    connectDragSource, connectDropTarget }, ref) => {

    const elementRef = useRef(null)
    connectDragSource(elementRef)
    connectDropTarget(elementRef)

    const opacity = isDragging ? 0.4 : 1
    useImperativeHandle<{}, CardInstance>(ref, () => ({
      getNode: () => elementRef.current,
    }))
    return (
      <Paper className={classes.card} ref={elementRef}

        style={{
          opacity: opacity,
          background: isTurn ?
            card.colour.name == "Multi" ? 'linear-gradient(to right bottom, #FFCC66, #9900FF)' : card.colour.code
            : "lightGrey"
        }} >

        <Grid container justify="flex-start"><Typography variant="caption" >
          {isTurn ? (numCards - index) : index + 1}</Typography></Grid>
        <Grid container justify="flex-end">
          <div style={{ "marginTop": -24 }}>
            <Typography variant="h6">{//isTurn?"":
              card.rank} </Typography>
          </div>
        </Grid>
        <Grid container justify="center" >
          <div style={{ "marginTop": -12 }}>
            <Typography variant="h2">{//isTurn?"":
              card.rank} </Typography>
          </div>
          {/* <Typography variant="h2">{isTurn? card.rank:""}</Typography> */}
        </Grid>

        <Grid container justify="flex-end"><Typography variant="caption" >{isTurn ? card.idx : ""}</Typography></Grid>
      </Paper>
    )
  }
)

const handDisplay = DropTarget(
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
     
      // alert(JSON.stringify(monitor.getItem()))
      props.dropCard()
    
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
        
      }
    },
    // collecting function
    (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(HandDisplay),
)

export default withStyles(styles)(handDisplay)