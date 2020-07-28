
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Container from './components/Container'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import { NavBar } from './components/NavigationBar'
import Login from './components/Login'

// import { BrowserRouter } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        {/* <BrowserRouter> */}
        <Provider store={store}>
          <NavBar />
          <Login></Login>
          <DragDropContextProvider backend={HTML5Backend}>
            <Container>
            </Container>
          </DragDropContextProvider>
        </Provider>
        {/* </BrowserRouter> */}
      </div>
    )
  }
}

export default App

