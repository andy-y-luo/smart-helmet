import React from "react"

const getHelmsMenu = (helmets) =>{
  return _.values(helmets).map( h =>{
    return <div id={h.id}>{h.name}</div>
  })
}

const Sidebar = ({state}) => {
  return <div id="sidebar">
    {getHelmsMenu(state.helmets)}
  </div>
}

export default Sidebar
