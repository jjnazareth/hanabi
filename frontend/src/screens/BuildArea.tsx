import React from 'react'
import { withStyles } from '@material-ui/core'
import { Grid, WithStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../Styles'
import BuildCards from './BuildCards'
import { Card, CardRank } from '../globalTypes'
import {
  DropTarget,
  ConnectDropTarget,
  DropTargetMonitor,
  DropTargetConnector,
} from 'react-dnd'
import { dndItemTypes } from './itemTypes'

export interface BuildAreaProps extends WithStyles<typeof styles> {
  numPlayers: number
  setNextTurn: (numPlayers: number) => (void)
  canDrop: boolean
  isOver: boolean
  connectDropTarget: ConnectDropTarget
}

const BuildArea: React.FC<BuildAreaProps> = ({
  numPlayers,
  setNextTurn,
  canDrop,
  isOver,
  connectDropTarget,
  classes
}) => {

  const isActive = canDrop && isOver
  let colour = isActive ? '#AED581' : '#DCEDC8'

  let arrC = [
    { name: "White", code: "#FFFFFF" },
    { name: "Yellow", code: "#FFCC66" },
    { name: "Green", code: "#00CC00" },
    { name: "Blue", code: "#0066CC" },
    { name: "Red", code: "#CC0033" },
    { name: "Multi", code: "" }, // code:"#9900FF"} 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  ]

  // let arrC = [CardColour.WHITE, CardColour.YELLOW, CardColour.GREEN, CardColour.BLUE, CardColour.RED, CardColour.MULTI]
  let arrR = [CardRank.Rank1, CardRank.Rank2, CardRank.Rank3, CardRank.Rank4, CardRank.Rank5]
  let pack: Card[] = [];
  let ctr = 0
  arrR.forEach(r =>
    arrC.forEach(c => {
      if (r == CardRank.Rank1) {
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
      if (r == CardRank.Rank2 || r == CardRank.Rank3 || r == CardRank.Rank4) {
        pack.push({ idx: ctr++, colour: c, rank: r })
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
      if (r == CardRank.Rank5) {
        pack.push({ idx: ctr++, colour: c, rank: r })
      }
    })
  )


  return (
    <div ref={connectDropTarget} className={classes.buildArea} style={{ backgroundColor: colour }}>
      <h3>{isActive ? 'Release to Place' : 'Build Pile'}</h3>
      <Grid container className={classes.buildCards} justify="center" direction="row" spacing={1}>
        {pack.slice(30, 36).map((card, i) => (
          <Grid key={card.idx} item>
            <BuildCards card={card}></BuildCards>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

const buildArea = DropTarget(

  dndItemTypes.CARD,
  {
    drop: ((props: BuildAreaProps, monitor) => {
      const { setNextTurn, numPlayers } = props
      alert(JSON.stringify(monitor.getItem()))
      setNextTurn(numPlayers)
    }),
    canDrop: ((props: BuildAreaProps, monitor) => {
      return monitor.getItem().isTurn
    })
  },

  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),

  }),
)(BuildArea)

export default withStyles(styles)(buildArea)