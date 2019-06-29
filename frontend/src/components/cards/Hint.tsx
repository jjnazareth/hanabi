import React, { useState } from 'react'
import { CardRank, Player, HintChoices, RankHint, ColourHint } from '../../globalTypes'
import { WithStyles, withStyles, Icon, IconButton } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../../Styles'

import HintDialog from './HintDialog'

interface IProps extends WithStyles<typeof styles> {
  holder: Player
  isTurn: boolean
}

const Hint: React.FC<IProps> = ({ classes, holder, isTurn }) => {

  let cardsWithPos = holder.hand.map((c, i) => ({ ...c, position: i }))
  let rankHints: RankHint[] =
    [CardRank.Rank1, CardRank.Rank2, CardRank.Rank3, CardRank.Rank4, CardRank.Rank5]
      .map(r => ({
        type: "Rank" as "Rank",
        rank: r,
        position: cardsWithPos.filter(c => c.rank == r)
          .map(card => card.position + 1)
      })).filter(obj => obj.position.length > 0)

  let colourHints: ColourHint[] =
    ["White", "Yellow", "Green", "Blue", "Red"]
      .map(colour => ({
        type: "Colour" as "Colour",
        colour: colour,
        position: cardsWithPos.filter(c => (c.colour.name == colour)
          || (c.colour.name == "Multi"))
          .map(card => card.position + 1)
      })).filter(obj => obj.position.length > 0)

  const hintChoices: HintChoices = {
    playerName: holder.name, hints: [...rankHints, ...colourHints]
  }

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = (newValue?: string) => {
    setOpen(false)
    if (newValue) {
      setValue(newValue)
    }
  }

  if (isTurn)
    return <div />
  else
    return (
      <div>
        <IconButton color="primary" size="small" className={classes.icon} onClick={handleClickOpen}>
          <Icon>?</Icon>
        </IconButton>
        <HintDialog keepMounted={true} open={open} onClose={handleClose} value={""}
          hintChoices={hintChoices} />
        {value && alert(value)}
      </div>
    )
}
export default (withStyles(styles)(Hint))
