import React, { Component } from 'react'
import { connect } from 'react-redux'
import Game from './Game'
import { initGame } from '../actions'
import { useEffect } from 'react'
import Login from './Login'
import { Fragment } from 'react'

interface IProps {
  initGame: (playerNames: string[], turnIdxs: number[],
    currentTurnIdx: number, dealerIdx: number) => void
}

class Container extends Component<IProps> {

  public componentDidMount(): void {
    const { initGame } = this.props
    let playerNames: string[] =
      ['Jivraj', 'Shanta', 'Nikesh', 'Nitin', 'Mikey']
    let turnIdxs = [1, 3, 2, 4, 0]
    let dealerIdx = 4
    let currentTurnIdx = (dealerIdx + 1) % playerNames.length
    initGame(playerNames, turnIdxs, currentTurnIdx, dealerIdx)
  }

  public render(): JSX.Element {
    return (
      <Fragment>
        <Game></Game>
      </Fragment>
    )
  }

}

export default connect(null, { initGame })(Container)

