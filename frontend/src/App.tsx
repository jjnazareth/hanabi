import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Container from './components/Container'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'
import Navbar from '../src/components/Navbar'


class App extends Component {
  render() {
    return (
      <div>
          <Navbar />
          <Provider store={store}>
            <DragDropContextProvider backend={HTML5Backend}>
              <Container>
              </Container>
            </DragDropContextProvider>
          </Provider>
      </div>
   
    )
  }
}

export default App

