
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { NavBar } from './components/NavBar'
// import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'
import { TestNavBar } from './components/TestNavBar'
import { PlayerBoard } from './components/setup/PlayerBoard'

import { Player } from '../src/globalTypes'

const players = [
  { id: 0, name: "Jivraj" },
  { id: 2, name: "Nitin" },
  { id: 3, name: "Nikesh", },
  { id: 1, name: "Shanta" },
  { id: 4, name: "Mikey" },
]

interface IProps {
}

export const App: React.FC<IProps> = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Provider store={store}>
        <DragDropContextProvider backend={HTML5Backend}>
          {/* <TestLogin ></TestLogin> */}
          <PlayerBoard items={players}></PlayerBoard>
          <NavBar></NavBar>
        </DragDropContextProvider>
      </Provider>
    </Fragment>
  )
}
