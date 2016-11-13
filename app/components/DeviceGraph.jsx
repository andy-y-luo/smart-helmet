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
    return <div className={"panel panel-success graph"}>
    <div className="panel-heading">Panel heading without title</div>
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
