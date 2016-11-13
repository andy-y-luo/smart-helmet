import { createStore } from 'redux'
import helmetsApp from "./reducers"

let store = createStore(helmetsApp)

export default store
