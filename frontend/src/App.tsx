
import React, { Fragment, useEffect, useContext } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { NavBar } from './components/NavBar'
import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'
import { FirebaseContext } from './firebase/firebase'

// import { TestNavBar } from './components/TestNavBar'

interface IProps {
}

export const App: React.FC<IProps> = () => {
  const { app, api } = useContext(FirebaseContext)

  useEffect(() => {
    api.addMember({ playerId: 1000, userName: "Test", password: "password" })
    api.getMembers()
    return () => {
    }
  }, [])

  return (
    <>
      <CssBaseline />
      <Provider store={store}>
        <DragDropContextProvider backend={HTML5Backend}>
          <TestLogin ></TestLogin>
          <NavBar></NavBar>
        </DragDropContextProvider>
      </Provider>
    </>
  )
}
