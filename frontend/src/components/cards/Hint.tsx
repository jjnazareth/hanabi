import React, { useState } from 'react'
import { CardRank, Player, HintChoices, RankHint, ColourHint } from '../../globalTypes'
import { Button } from '@material-ui/core'
import 'typeface-roboto'
import { useStyles } from '../../Styles'

import HintDialog from './HintDialog'

interface IProps {
  holder: Player
  isTurn: boolean
}

const Hint: React.FC<IProps> = ({ holder, isTurn }) => {
  const classes = useStyles()
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
    if (!isTurn)
      setOpen(true)
  }
  const handleClose = (newValue?: string) => {
    setOpen(false)
    if (newValue) {
      setValue(newValue)
    }
  }
  return (
    <div>
      <Button size="small" className={classes.button} onClick={handleClickOpen}>
        {holder.name}
      </Button>

      <HintDialog keepMounted={true} open={open} onClose={handleClose} value={""}
        hintChoices={hintChoices} />
      {value && alert(value)}
    </div>
  )
}
export default (Hint)
