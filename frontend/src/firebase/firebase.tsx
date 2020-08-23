import React, { createContext, useEffect, ReactNode, Context } from "react"
import { firebaseConfig } from "./firebaseConfig"
import app from "firebase/app"
import "firebase/database"
import { useDispatch, useSelector } from "react-redux"
import { addJob } from "../actions"
import { Member } from '../globalTypes'
import { IGlobalState } from "../reducers"
// import { todoActions } from "../state/todos"

// we create a React Context, for this to be accessible
// from a component later


const FirebaseContext = createContext<any>(null)

interface Firebase {
  app: any
  database: any
  api: any
}

export { FirebaseContext }
export const FirebaseProvider = ({ children }: any) => {
  let firebase: any = {
    app: null,
    database: null
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
        getMembers,
        addMember
      }
    }
  }

  function addMember(member: Member) {
    firebase.database.ref('members').push().set(member)
      .then((doc: any) => {

        // nothing to do here since you already have a 
        // connection pulling updates to Todos
      })
      .catch((error: any) => {
        // dispatch(todoActions.showError("Error adding Todo to database"))
        console.error(error)
      })
  }
  // function to query Todos from the database and
  // fire a Redux action to update the items in real-time
  function getMembers() {

    firebase.database.ref("members").on('value', (snapshot: any) => {
      const vals = snapshot.val()
      console.log(vals)
      let _records = []
      for (var key in vals) {
        _records.push({
          ...vals[key],
          // id: key
        })
      }
      console.log(_records)
      // setTodos is a Redux action that would update the todo store
      // to the _records payload
      // dispatch(_records[0].description, _records[0].priority))
    })
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}
