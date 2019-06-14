import React from 'react'
import { withStyles } from '@material-ui/core'
import { WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'
import { connect } from 'react-redux'
import { discard } from '../reducers/room/room.actions'
import { Card, Player } from '../globalTypes'

import { CardRearrangeUpdate } from '../components/Game'

import {
    DropTarget,
    ConnectDropTarget,
    DropTargetMonitor,
    DropTargetConnector,
} from 'react-dnd'

import { dndItemTypes } from './itemTypes'
import { setNextTurn } from '../reducers/game/game.actions';

export interface DiscardProps extends WithStyles<typeof styles> {
    setNextTurn: (numPlayers: number) => (void)
    numPlayers: number
    discard: (player: Player, card: Card) => void
    canDrop: boolean
    isOver: boolean
    connectDropTarget: ConnectDropTarget
}

const Discards: React.FC<DiscardProps> = ({
    setNextTurn,
    numPlayers,
    canDrop,
    isOver,
    connectDropTarget,
    classes
}) => {

    const isActive = canDrop && isOver
    let colour = isActive ? '#FF7043' : '#FCE4EC'

    return (
        <div ref={connectDropTarget} className={classes.discards}
            style={{ backgroundColor: colour }}>
            <h3>{isActive ? 'Release to Discard' : 'Discards'}</h3>
        </div>
    )
}

const discards = DropTarget(

    dndItemTypes.CARD,
    {
        drop: ((props: DiscardProps, monitor) => {
            const { setNextTurn, numPlayers } = props

            props.discard(monitor.getItem().holder,
                monitor.getItem().card)
            setNextTurn(numPlayers)
 
        }),
        hover(
            props: DiscardProps,
            monitor: DropTargetMonitor,
            //component: CardInstance,
          ) {
            // alert ("Hover")
          },
        canDrop: ((props: DiscardProps, monitor) => {
            return monitor.getItem().isTurn && !CardRearrangeUpdate.toUpdate
        })
    },

    (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
    }),
)(Discards)

export default connect(null, { discard })(withStyles(styles)(discards))

