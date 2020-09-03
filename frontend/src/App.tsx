
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { NavBar } from './components/NavBar'
import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'
import { firebaseConfig } from './firebase/firebaseConfig'
import store from './store'

import firebase from "firebase/app"
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, } from "react-redux-firebase"
import { Provider } from 'react-redux'
import { createStore } from 'redux'


interface IProps {
}


const rrfConfig = {
  useFirestoreForProfile: true
}

firebase.initializeApp(firebaseConfig)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // dispatch: {},
  createFirestoreInstance
}

export const App: React.FC<IProps> = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <TestLogin />
        <CssBaseline />
        <DndProvider backend={HTML5Backend}>
          <NavBar></NavBar>
        </DndProvider>
      </ReactReduxFirebaseProvider>
    </Provider>

  )
}

