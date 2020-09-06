
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { NavBar } from './components/NavBar'
import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'

import store from './store'
import { Provider } from 'react-redux'



interface IProps {
}

export const App: React.FC<IProps> = () => {
  return (
    <Provider store={store}>
      <TestLogin />
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <NavBar></NavBar>
      </DndProvider>
    </Provider>
  )
}

