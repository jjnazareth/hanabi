
import React, { Fragment, useEffect, useContext, useState } from 'react'
import { Provider, useSelector } from 'react-redux'

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { NavBar } from './components/NavBar'
import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'
import { FirebaseContext } from './firebase/firebase'
import { SeatPlayers } from './components/setup/SeatPlayers'

interface IProps {
}

export const App: React.FC<IProps> = () => {
  const { app, api } = useContext(FirebaseContext)
  return (
    <>
      <TestLogin />
      <CssBaseline />

      {/* Provider store={store} is now above App.jsx in the component hierarchy */}
      <DragDropContextProvider backend={HTML5Backend}>
        <NavBar></NavBar>
      </DragDropContextProvider>

    </>
  )
}
