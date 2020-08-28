
import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { NavBar } from './components/NavBar'
import { TestLogin } from './components/login/TestLogin'
import { CssBaseline } from '@material-ui/core'


interface IProps {
}

export const App: React.FC<IProps> = () => {
  return (
    <>
      <TestLogin />
      <CssBaseline />
      {/* Provider store={store} is now above App.jsx in the component hierarchy */}
      <DndProvider backend={HTML5Backend}>
        <NavBar></NavBar>
      </DndProvider>
    </>
  )
}
