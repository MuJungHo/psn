import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const configStore = () => {
  return createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
  )
}

export default configStore
