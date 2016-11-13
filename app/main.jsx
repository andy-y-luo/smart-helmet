import _ from "lodash"
import io from "socket.io-client"
import helmetsApp from "./reducers"

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import HelmetContainer from './HelmetContainer'

let store = createStore(helmetsApp)

render(
  <Provider store={store}>
    <HelmetContainer/>
  </Provider>,
  document.getElementById("container")
)

var socket = io("localhost:3030");
socket.on('helmet', function (data) {
  store.dispatch({type: 'HELMET_DATA', helmet: data})
});

socket.on('helmet-reading', function(data) {
  store.dispatch({type: 'HELMET_READING', data: data})
})
