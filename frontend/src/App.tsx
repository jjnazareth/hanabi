
import React, { Component, useState } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Container from './components/Container'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { NavBar } from './components/NavigationBar'
import Login from './components/login/Login'


export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <NavBar />
      <Login ></Login>
      <DragDropContextProvider backend={HTML5Backend}>
        <Container>
        </Container>
      </DragDropContextProvider>
    </Provider>
  )
}


// class App extends Component
//   render() {
//     return (
//       <Provider store={store}>
//         <NavBar />
//         <Login></Login>
//         <DragDropContextProvider backend={HTML5Backend}>
//           <Container>
//           </Container>
//         </DragDropContextProvider>
//       </Provider>
//     )
//   }
// }

// export default App

