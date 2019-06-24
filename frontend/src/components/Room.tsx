import React, { Component } from 'react'
import { connect } from 'react-redux'
import { IRoomState } from '../reducers/room/room.reducer'
import { IGlobalState } from '../reducers'
import { initGame } from '../actions'


interface IProps {
  // room: IRoomState
  initGame: (playerNames: string[], turnIdxs: number[],
    currentTurnIdx: number, dealerIdx: number) => void
  /* initHand: (turnIdx: number, cards: Card[]) => void
  initDeck: (cards: Card[]) => void */
}

class Room extends Component<IProps> {
  public componentWillMount(): void {
    let playerNames: string[] =
      ['Jivraj', 'Shanta', 'Nikesh', 'Nitin', 'Mikey']
    let turnIdxs = [1, 3, 2, 4, 0]
    let [currentTurnIdx, dealerIdx] = [1, 2]
    this.props.initGame(playerNames, turnIdxs, currentTurnIdx, dealerIdx)
  }
  public render(): JSX.Element {
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: IGlobalState) => ({
})

export default connect(mapStateToProps, {
  initGame, 

})(Room)
