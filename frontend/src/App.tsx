
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { NavBar } from './components/NavBar'
import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'
import { TestNavBar } from './components/TestNavBar'

interface IProps {
}

export const App: React.FC<IProps> = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Provider store={store}>
        <DragDropContextProvider backend={HTML5Backend}>
          <TestLogin ></TestLogin>
          <NavBar></NavBar>
          {/* <NavBar></NavBar> */}
        </DragDropContextProvider>
      </Provider>
    </Fragment>
  )
}


