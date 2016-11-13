import React from "react"

const DeviceGraph = React.createClass({
  readings() {
    return this.props.device.readings.map((reading) => {
      return <div>{reading.time + " - "+ reading.value}</div>
    });
  },

  render() {
    return <div>{this.readings()}</div>
  }
})

export default DeviceGraph
