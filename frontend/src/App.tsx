import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Container from './components/Container'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContextProvider } from 'react-dnd'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <DragDropContextProvider backend={HTML5Backend}>
                    <Container hdr="HEADER">
                    </Container>
                </DragDropContextProvider>
            </Provider>
        )
    }
}

export default App

