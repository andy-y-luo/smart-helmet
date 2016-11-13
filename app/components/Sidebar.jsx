import React from "react"

const getHelmsMenu = (helmets) =>{
  return _.values(helmets).map( h =>{
    return <div key={h.id}>{h.name}</div>
  })
}

const Sidebar = ({state}) => {
  return <div id="sidebar" className="col-md-4">
    {getHelmsMenu(state.helmets)}
  </div>
}

export default Sidebar
