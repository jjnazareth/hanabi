import React, { createContext } from "react"
import { firebaseConfig } from "./firebaseConfig"
import app from "firebase/app"
import "firebase/database"
import { useDispatch } from "react-redux"
import { setMembers, } from "../actions"
import { Member } from '../globalTypes'

const FirebaseContext = createContext<any>(null)

interface Firebase {
  app: any
  database: any
  api: any
}

export { FirebaseContext }
export const FirebaseProvider = ({ children }: any) => {
  let firebase: Firebase = {
    app: null,
    database: null,
    api: null
  }

  const dispatch = useDispatch()
  // check if firebase app has been initialized previously
  // if not, initialize with the config we saved earlier
  if (!app.apps.length) {
    app.initializeApp(firebaseConfig)
    firebase = {
      app: app,
      database: app.database(),
      api: {
        readMembers,
        writeMember
      }
    }
  }

  function writeMember(member: Member) {
    let ndx = firebase.database.ref('members')
    firebase.database.ref('members').push().set(member)
      .then((doc: any) => {
        // nothing to do here since readMembers() will be fired
        // as soon as writeMember  will complete. This will update the
        // redux store
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  // fire a Redux action to update the items in real-time
  function readMembers() {
    firebase.database.ref("members").on('value', (snapshot: any) => {
      const vals = snapshot.val()
      let _members = []
      for (var key in vals) {
        _members.push({
          ...vals[key],
          // id: key
        })
      }
      // Redux action that would update the todo store
      // to the _records payload
      dispatch(setMembers(_members))
    })
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}
