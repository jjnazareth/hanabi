import React, { Component } from 'react'
import { connect } from 'react-redux'
import Game from './Game'

interface IProps {
}

class Container extends Component<IProps> {
  public render(): JSX.Element {
    return (
        <Game></Game>
    )
  }
}

export default connect(null, {})(Container)
