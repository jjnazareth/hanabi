import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { reduxFirestore, getFirestore } from "redux-firestore"
import { getFirebase, createFirebaseInstance } from "react-redux-firebase"
import { rootReducer } from "./reducers"
import { firebaseConfig } from "./firebase/firebaseConfig"

const initialState = {}
const middleware = [thunk.withExtraArgument(getFirebase)]

const store = createStore(
  rootReducer,
  initialState
  //   applyMiddleware(...middleware)
)
export default store
