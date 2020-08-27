import React, { useState, useCallback } from 'react'
import { MemberItem } from './MemberItem'
import update from 'immutability-helper'

const style = { width: 400, }

import { T } from './MemberItem'
import { seatMembers } from '../../reducers/room/room.actions'
import { Member } from '../../globalTypes'

interface IProps {
  items: Member[]
}

export const MemberBoard: React.FC<IProps> = (props => {
  {

    const [items, setItems] = useState(props.items)
    const moveItem = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragItem = items[dragIndex]
        setItems(
          update(items, {
            $splice: [[dragIndex, 1], [hoverIndex, 0, dragItem]],
          })
        )
      }, [items])
    const dispatchItems = () => {
      console.log("dispatched: ", items)
      seatMembers(items)
    }
    const renderItem = (item: T, index: number) => {
      return (
        <MemberItem
          key={item.playerId}
          playerId={item.playerId}
          userName={item.userName}
          index={index}
          moveItem={moveItem}
          dispatchItems={dispatchItems}
        />
      )
    }

    return (
      <>
        <div style={style}>{items.map((item, i) =>
          renderItem(item, i)
        )}
        </div>
      </>
    )
  }
})
