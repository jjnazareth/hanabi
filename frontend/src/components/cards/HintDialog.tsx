import React, { useState, useEffect } from 'react'
import { HintType, HintChoices} from '../../globalTypes'

import { WithStyles, withStyles } from '@material-ui/core'
import 'typeface-roboto'
import { styles } from '../../Styles'
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  Radio, RadioGroup, FormControlLabel
} from '@material-ui/core';




interface IProps extends WithStyles<typeof styles> {
  hintChoices : HintChoices
  keepMounted: boolean,
  value: string
  open: boolean,
  onClose: (value?: string) => void,
}

const HintDialog: React.FC<IProps> = (props) => {
  const { classes, hintChoices, onClose, value: inputValue, open, ...other } = props;
  const [value, setValue] = React.useState(inputValue);
  const radioGroupRef = React.useRef<HTMLElement>(null);
  
  function handleEntering() {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  }
  const handleCancel = () => {
    onClose()
  }
  const handleOk = () => {
    onClose(value)
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  }
  const hintToText = (hint : HintType) => {
    switch (hint.type ) {
      case "Rank" :
        return `You have "${hint.rank}" in position: ${hint.position}`
      case "Colour":
        return `You have "${hint.colour}" in position: ${hint.position}`
      default:
        return "Error"
    }
  }

  return (
    <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="xs"
      onEntering={handleEntering} aria-labelledby="confirmation-dialog-title"
      open={open} {...other} >
      <DialogTitle id="confirmation-dialog-title">{hintChoices.playerName}</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef} aria-label=""
          name="" value={value}
          onChange={handleChange}>
          {hintChoices.hints.map((hint, i) => (
            <FormControlLabel value={JSON.stringify(hint)} key={i} control={<Radio />} label={hintToText(hint)} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default (withStyles(styles)(HintDialog))