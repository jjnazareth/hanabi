import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const config = {
  apiKey: "AIzaSyBT6LKR3PnpJUB_pZAHVywqdlefsCpL2Ag",
  authDomain: "hanabi-64a16.firebaseapp.com",
  databaseURL: "https://hanabi-64a16.firebaseio.com",
  projectId: "hanabi-64a16",
  storageBucket: "hanabi-64a16.appspot.com",
  messagingSenderId: "53149206024",
  appId: "1:53149206024:web:5afb986a99b4d9e6d0b3bd",
  measurementId: "G-CGDRTJVTXD"
}

firebase.initializeApp(config)
firebase.firestore()
export default firebase
