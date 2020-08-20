import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyBT6LKR3PnpJUB_pZAHVywqdlefsCpL2Ag",
  authDomain: "hanabi-64a16.firebaseapp.com",
  databaseURL: "https://hanabi-64a16.firebaseio.com",
  projectId: "hanabi-64a16",
  storageBucket: "hanabi-64a16.appspot.com",
  messagingSenderId: "53149206024",
  appId: "1:53149206024:web:5afb986a99b4d9e6d0b3bd",
  measurementId: "G-CGDRTJVTXD"
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
