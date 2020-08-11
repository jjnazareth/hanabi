import React, { useState } from 'react'
import { CardRank, Player, HintChoices, RankHint, ColourHint, PlayerHint, Card, RCHint } from '../../globalTypes'
import { Button, makeStyles, Theme, createStyles } from '@material-ui/core'

import { HintDialog } from './HintDialog'
import { connect } from 'react-redux'
import { giveHint, setNextTurn } from '../../actions'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { IGlobalState } from '../../reducers'
import { CardDisplay } from './CardDisplay'

const useStyles = makeStyles<Theme>((theme: Theme) =>
  createStyles({
    button: {
    },
  })
)



interface IProps {
  holder: Player
  isTurn: boolean
  playerId: number
  hints: RCHint[]
  giveHint: (playerHint: PlayerHint) => void
  setNextTurn: () => void
}


export const getHintChoices = (cards: Card[]) => {
  const cardsWithPos = cards.map((c, i) => ({ ...c, position: i }))
  let rankHints: RankHint[] =
    [CardRank.Rank1, CardRank.Rank2, CardRank.Rank3, CardRank.Rank4, CardRank.Rank5]
      .map(r => ({
        type: "Rank" as "Rank",
        rank: r,
        position: cardsWithPos.filter(c => c.rank == r)
          .map(card => card.position + 1)
      })).filter(obj => obj.position.length > 0)

  const colourHints: ColourHint[] =
    ["White", "Yellow", "Green", "Blue", "Red"]
      .map(colour => ({
        type: "Colour" as "Colour",
        colour: colour,
        position: cardsWithPos.filter(c => (c.colour.name == colour)
          || (c.colour.name == "Multi"))
          .map(card => card.position + 1)
      })).filter(obj => obj.position.length > 0)

  return [...rankHints, ...colourHints]
}

const _Hint: React.FC<IProps> = ({ holder, isTurn, playerId, hints, giveHint, setNextTurn }) => {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const handleClickOpen = () => {
    if (!isTurn) setOpen(true)
  }
  const handleClose = (newValue?: string) => {
    setOpen(false)
    if (newValue) {
      setValue(newValue)
      giveHint({ fromPlayerId: playerId, toPlayerId: holder.playerId, hintToString: newValue as string })
      setNextTurn()
    }
  }
  return (
    <Fragment>
      <Button color="primary" disabled={isTurn} size="medium" onClick={handleClickOpen}>
        {holder.name}
      </Button>
      <HintDialog keepMounted={true} open={open} onClose={handleClose} value={""}
        hintChoices={{ player: holder, hints: hints }} />
    </Fragment>
  )
}

export const Hint = connect(null, { giveHint, setNextTurn })(_Hint)


