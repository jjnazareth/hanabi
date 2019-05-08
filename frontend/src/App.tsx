import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Container from './components/Container'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Container>
                
                </Container>             
            </Provider>
        )
    }
}

export default App
