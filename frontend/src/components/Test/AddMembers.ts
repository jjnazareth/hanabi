import firebase from "./firebase"
import { permanentMembers } from "../../reducers/register/PermanentMembers"
const db = firebase.firestore()
interface User {
  playerId: number
  userName: string
  password: string
}

export const addUser = (user: User) => {
  db.collection("users")
    .add({
      playerId: user.playerId,
      userName: user.userName,
      password: user.password
    })
    .then(function (doc) {
      console.log("Document Id: ", doc.id)
    })
    .catch(function (error) {
      console.error("Error adding document: ", error)
    })
}
export const addUsers = (users: User[]) => {
  users.map((user) => addUser(user))
}

export const listUsers = () => {
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
      })
    })
}

export const countUsers = () => {
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      let count = querySnapshot.docs.length
      console.log(`Total number of records: ${count}`)
    })
}
