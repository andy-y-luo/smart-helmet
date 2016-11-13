import React from "react"
import RC2 from 'react-chartjs2';

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
  getData() {
    if(this.props.device.readings.length){
      return {datasets: [{
        radius: 0,
        label: "Accel",
        data: this.props.device.readings.map((d)=>{return d.y})
      }],
      labels:Array(200).join(".").split(".")
      }
    }

  },
  render() {
    if(this.props.device.readings.length == 0){
      return null
    }
    var headingColor = function(readings){
      if (readings[readings.length-1] < 50){
        return "panel panel-success graph"}
      else if (readings[readings.length-1] < 70){
        return "panel panel-warning graph"}
      else{
        return "panel panel-danger graph"}
    }
    return <div className={headingColor(this.props.device.readings)}>
    <div className="panel-heading">{this.props.device.name}</div>
    <RC2 data={this.getData()} options={
      {animation:{duration:0}, scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        min: 0,
                        max: 80
                    }
                  }],

               },
               legend:{display:false}
            }} type='line' redraw={true} /></div>;
  }
})

export default DeviceGraph
