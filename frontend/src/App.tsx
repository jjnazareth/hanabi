
import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { Container } from './components/Container'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { NavBar } from './components/NavigationBar'
import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'


export const App: React.FC<{}> = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Provider store={store}>
        <DragDropContextProvider backend={HTML5Backend}>
          <TestLogin ></TestLogin>
          <NavBar />
          {/* <Container>
          </Container> */}
        </DragDropContextProvider>
      </Provider>
    </Fragment>
  )
}


