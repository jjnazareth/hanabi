import React, { useRef } from 'react'
import { Card, Player, CardFace } from '../../globalTypes'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { dndItemTypes } from './itemTypes'
import { XYCoord } from 'react-dnd'
import { CardDisplay } from './CardDisplay'
import { monitorEventLoopDelay } from 'perf_hooks'

interface DragItem {
  holder: string
  index: number
  type: string
}

interface IProps {
  moveCard: (dragIndex: number, hoverIndex: number) => void
  dispatchMove: () => (void)
  holder: Player
  index: number
  card: Card

  isHidden: boolean
  isTurn: boolean

}

export const HandCard: React.FC<IProps> = ({ holder, card, index, isHidden, isTurn, moveCard, dispatchMove }) => {

  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: dndItemTypes.CARD,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) { return }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()

      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the left
      const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left
      /* 
        Only perform the move when the mouse has crossed half of the items width
        When dragging leftwards, only move when the cursor is below 50%
        When dragging rightwards, only move when the cursor is above 50%
      */
      // Dragging leftwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) { return }


      // Dragging rightwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) { return }
      // cards should be exchanged in one hand only  

      console.log("Monitor: ", monitor.getItem().holder.playerId, "Holder: ", holder.playerId)

      if (!(monitor.getItem().holder.playerId === holder.playerId)) { return }

      console.log("drag:", dragIndex, " hover: ", hoverIndex)
      moveCard(dragIndex, hoverIndex)

      /*       
      Note: we're mutating the monitor item here!
      Generally it's better to avoid mutations,
      but it's good here for the sake of performance
      to avoid expensive index searches.
      */
      monitor.getItem().index = hoverIndex

    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: dndItemTypes.CARD, holder, card, index, isTurn },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    end: ((item, monitor) => {
      const result = monitor.getDropResult()
      if (result && result.arrange) { dispatchMove() }
    })
  })

  const opacity = isDragging ? 0.5 : 1.0
  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity: opacity }}>
      {isHidden ?
        <CardDisplay card={card} cardFace={CardFace.BACK} index={index + 1}></CardDisplay>
        : <CardDisplay card={card} cardFace={CardFace.FRONT} index={index + 1} ></CardDisplay>
      }
    </div>
  )
}

