import React, { Component } from 'react'
import { connect } from 'react-redux'
import Room from './Room'
import Game from './Game'

interface IProps {
}

class Container extends Component<IProps> {
  public render(): JSX.Element {
    return (
      <div>
        {/* this initialises players' names */}
        <Room></Room> 
        {/* this initialises player's hands. 
            The render order of these components
            is important */}
        <Game></Game>
      </div>
    )
  }
}


export default connect(null, {

})(Container)
