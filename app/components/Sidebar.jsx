import React from "react"
import store from '../store'

const dismissCurry = (id) => {
  return () => {
    store.dispatch({type:'DISMISS_ALERT', id:id})
  }
}

const getMessages = (messages) =>{
  return messages.map((message)=>{
    return <div className="alert alert-danger alert-dismissible">

      {message.message}
      <button type ="button" className = "close" data-dismiss="alert" onClick={dismissCurry(message.id)}>
        <span>
        &times;
        </span>
      </button>
    </div>
  })
}

const Sidebar = ({state}) => {
  return <div id="sidebar" className="col-md-4">
    {getMessages(state.messages)}
  </div>
}

export default Sidebar
