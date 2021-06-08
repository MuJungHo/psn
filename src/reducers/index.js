import { combineReducers } from 'redux'
import user from './user'
import drawer from './drawer'
import program from './program'
export default combineReducers({ 
    user, 
    drawer,
    program
})
