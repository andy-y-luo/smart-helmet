import React from "react"
import {LineChart} from "react-d3-basic"

const x = d =>{
  return d.time
}

const DeviceGraph = React.createClass({

  render() {
  return <LineChart
        showXGrid = {false}
        showYGrid = {false}
        title = {this.props.device.name}
        width = {700}
        height = {300}
        margins = {{left:100, right: 100, top: 50, bottom:50}}
        data = {this.props.device.readings}
        chartSeries = {[{
          field: "value",
          name: "value",
          color: '#0003ff'
        }]}
        x = {x}
        />

  }
})

export default DeviceGraph
