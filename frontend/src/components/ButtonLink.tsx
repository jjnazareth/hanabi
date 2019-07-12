import React from 'react';
import { Link } from '@material-ui/core';
import Hint from './cards/Hint'
import {
  Grid, Paper, Typography, WithStyles, withStyles
} from '@material-ui/core'
import { styles } from '../Styles'
import { Player } from '../globalTypes';

interface ButtonLinkProps extends WithStyles<typeof styles> {
  player: Player
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ player }) => {
  return (
    <div>
      <Hint holder={player} isTurn={false} />
    </div>
  )
}

export default withStyles(styles)(ButtonLink)