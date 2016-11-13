import React from "react"
import Sidebar from "./Sidebar"
import DeviceGraph from './DeviceGraph'

const graphs = (state) => {
  return _.values(state.helmets).map((helmet) =>
    <DeviceGraph key={helmet.id} device={helmet}/>)
}

const HelmetsApp = ({state}) => {
  return <div>
    <Sidebar state={state}/>
    <div className="col-md-6">{graphs(state)}</div>
  </div>
}

export default HelmetsApp
