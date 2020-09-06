import React, { useState, useCallback, useEffect } from 'react'
import { MemberItem } from './MemberItem'
import update from 'immutability-helper'
import { seatMembers } from '../../actions'

import { T } from './MemberItem'
import { Member } from '../../globalTypes'
import { connect } from 'react-redux'

const style = { width: 400, }
interface IProps {
  memberItems: Member[]
  seatMembers: (members: Member[]) => void
}


const _MemberBoard: React.FC<IProps> = ({ memberItems, seatMembers }) => {
  const [items, setItems] = useState(memberItems)

  useEffect(() => {
    seatMembers(items)
    return () => {
    }
  }, [seatMembers, items])

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


export const MemberBoard = connect(null, { seatMembers })(_MemberBoard)
