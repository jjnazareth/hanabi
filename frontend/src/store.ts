import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import { reduxFirestore, getFirestore } from "redux-firestore"
import { getFirebase } from "react-redux-firebase"
import { rootReducer } from "./reducers"
import fbConfig from "./firebase/fbConfig"
const initialState = {}
const middleware = [thunk.withExtraArgument({ getFirebase, getFirestore })]

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware), reduxFirestore(fbConfig))
)
export default store
