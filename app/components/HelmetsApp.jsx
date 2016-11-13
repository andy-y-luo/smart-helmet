import React from "react"
import Sidebar from "./Sidebar"

const HelmetsApp = ({state}) => {
  return <div>
    <Sidebar state={state}/>
    <div id="content"></div>
  </div>
}

export default HelmetsApp
