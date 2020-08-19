import React, { useState, useCallback } from 'react'
import { PlayerItem } from './PlayerItem'
import update from 'immutability-helper'

import { T } from './PlayerItem'
const style = {
  width: 400,
}



interface IProps<T> {
  items: Array<T>
}

export const PlayerBoard: React.FC<IProps<T>> = (props => {
  {
    const obj = props
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
    const renderItem = (item: T, index: number) => {
      return (
        <PlayerItem
          key={item.playerId}
          playerId={item.playerId}
          userName={item.userName}
          index={index}
          moveItem={moveItem}
        />

      )
    }

    return (
      <>
        {console.log(items)}
        <div style={style}>{items.map((item, i) =>
          renderItem(item, i)
        )
        }

        </div>
      </>

    )
  }
})
