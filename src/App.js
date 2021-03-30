import React from 'react'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter.js'
import ConfigureStore from './configureStore.js'
import theme from './customTheme.js'
import { ThemeProvider } from '@material-ui/styles'
import "./style/normalize.css"
import 'rsuite/dist/styles/rsuite-default.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
export const store = ConfigureStore()

const App = () => (
  <DndProvider backend={HTML5Backend}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </Provider>
  </DndProvider>
)

export default App
