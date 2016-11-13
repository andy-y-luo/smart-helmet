import React from "react"
import {LineChart} from "react-d3-basic"

const x = d =>{
  return d.time
}


const DeviceGraph = React.createClass({
  changeOfGraph(){
    if (this.props.device.readings[this.props.device.readings.length-1] > 70){
       return '#cc0200'
    }
    else{
       return '#ffffff'
    }
  },
  render() {
  return <LineChart
        showXGrid = {false}
        showYGrid = {false}
        title = {this.props.device.name}
        backgroundcolor = {this.changeOfGraph()}
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
