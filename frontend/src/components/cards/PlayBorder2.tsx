import React from 'react'
import { connect } from 'react-redux'
import { BuildArea } from './BuildArea'
import { DiscardArea } from './DiscardArea'
import { setNextTurn } from '../../actions'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core'
import { DropTarget, ConnectDropTarget, DropTargetMonitor, DropTargetConnector } from 'react-dnd'
import { dndItemTypes } from './itemTypes'


interface IStyleProps {
  isActive: boolean
}
const useStyles = makeStyles<Theme, IStyleProps>((theme: Theme) =>
  createStyles({
    table: ({ isActive }) => ({
      margin: 4,
      padding: 2,
      spacing: theme.spacing(2),
      width: 600,
      height: 680,
      backgroundColor: isActive ? '#FFC400' : 'lightBlue',
    }),
  })
)

interface IProps {
  numPlayers: number
  setNextTurn: () => void
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const _PlayBorder: React.FC<IProps> = ({ numPlayers, setNextTurn, canDrop, isOver, /* handleAllowRearrange.\, */ connectDropTarget, }) => {
  const isActive = canDrop && isOver
  const classes = useStyles({ isActive })
  // inhibit dispatch to redux store, as the mouse pointer is outside
  // the area where cards are being rearranged in one hand
  let colour = isActive ? '#FFC400' : ""

  return (
    // <div ref={connectDropTarget}>
    <Grid ref={connectDropTarget} container direction="column" justify="space-around"
      alignItems="center" className={classes.table}>
      <Grid item >
        <BuildArea setNextTurn={setNextTurn} />
      </Grid>
      <Grid item >
        <DiscardArea setNextTurn={setNextTurn} />
      </Grid>
    </Grid>
    // </div >
  )
}

export const PlayBorder = connect(null, { setNextTurn })
  (
    DropTarget(
      dndItemTypes.CARD,
      {
        hover(props: IProps, monitor: DropTargetMonitor) {
        },
        drop: ((props: IProps, monitor) => { }),
        canDrop: ((props: IProps, monitor) => { return monitor.getItem().isTurn })
      },

      (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    )(_PlayBorder)
  )
