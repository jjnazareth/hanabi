
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import store from './store'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { NavBar } from './components/NavBar'
import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'
import { FirebaseContext } from './firebase/firebase'
import { IGlobalState } from './reducers'
import { Member } from './globalTypes'
import { RegisterForm } from './components/login/RegisterForm'

// import { TestNavBar } from './components/TestNavBar'

interface IProps {
}

export const App: React.FC<IProps> = () => {
  const { app, api } = useContext(FirebaseContext)

  useEffect(() => {
    console.log("Eff")
    api && api.addMember({ playerId: 1000, userName: "Test", password: "password" })
    // api && api.getMembers()
    // return () => {
    // }
  }, [])


  return (
    <>
      <CssBaseline />
      {/* Provider store={store} is now around App.jsx */}
      <DragDropContextProvider backend={HTML5Backend}>
        <NavBar></NavBar>
      </DragDropContextProvider>

    </>
  )
}
