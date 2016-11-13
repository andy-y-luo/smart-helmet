import _ from "lodash"
import io from "socket.io-client"

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store' // kill me

import HelmetContainer from './HelmetContainer'


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

socket.on('message', function(data) {
  console.log("Message: ",data)
  store.dispatch({type: 'MESSAGE', data: data})
})
