import firebase from "./firebase"

// const db = firebase.firestore()
// interface User {
//   playerId: number
//   userName: string
//   password: string
// }

// export const addUser = (user: User) => {
//   db.collection("users")
//     .add({
//       playerId: user.playerId,
//       userName: user.userName,
//       password: user.password
//     })
//     .then(function (doc) {
//       console.log("Document Id: ", doc.id)
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error)
//     })
// }
// export const addUsers = (users: User[]) => {
//   users.map((user) => addUser(user))
// }

// export const getUsers = () => {
//   var users: any[] = []
//   db.collection("users")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         users.push(doc.data())
//       })
//     })
//   console.log(users)
//   return users
// }

// export const listUsers = () => {
//   db.collection("users")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data()}`)
//       })
//     })
// }

// export const countUsers = () => {
//   db.collection("users")
//     .get()
//     .then((querySnapshot) => {
//       let count = querySnapshot.docs.length
//       console.log(`Total number of records: ${count}`)
//     })
// }
