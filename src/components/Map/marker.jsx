import React, { Component } from "react";
import { Marker, Popup} from "react-leaflet";
import openSocket from "socket.io-client";
import LINE from '../line/line';
import something from '../icon/icon'

import L from 'leaflet'

// import faceIcon from '../icon/icon'
class Mrk extends Component {
  state = {
    position: [],
    markers1: [29.94692,76.81883, 0],
    markers2: [29.94820,76.81905, 0],
    markers3: [29.94857,76.81601, 0],
    markers4: [29.94898,76.81320, 0],
    markers5: [29.94720,76.81287, 0],
    markers6: [29.94678,76.815685, 0],
    markers:[
      [29.94692,76.81883, 0],
      [29.94820,76.81905, 0],
      [29.94857,76.81601, 0],
      [29.94898,76.81320, 0],
      [29.94720,76.81287, 0],
      [29.94678,76.815685, 0]],
    something: 0
  };

  componentWillMount = () => {
    console.log(something["menu"])
    const socket = openSocket("https://56421573.ngrok.io");
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          let pos = this.state.position;
          console.log("bhai", pos);
          for (var i = 0; i < pos.length; i++) {
            if (pos[i].name === window.localStorage.getItem("name")) {
              pos.splice(i, 1);
            }
          }
          //CHECKING POSITION
          let markers = this.state.markers;
          for (i = 0; i < markers.length; i++) {
            console.log((Math.abs(markers[i][0] - position.coords.latitude)))
            console.log((Math.abs(markers[i][1] - position.coords.longitude)))
            if(Math.abs(markers[i][0] - position.coords.latitude) <= 0.0005395999999997514 && Math.abs(markers[i][1] - position.coords.longitude) <= 0.0007308999999935395)  
            markers[i][2] = 1;
            this.setState({
              markers: markers
            })
          }
          pos.push({
            name: window.localStorage.getItem("name"),
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          console.log("pos", pos);

          this.setState({
            position: pos
          });

          socket.emit("updatePosition", {
            name: window.localStorage.getItem("name"),
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          for (i = 0; i < markers.length; i++) {
            socket.emit("updatePosition", {
              name: window.localStorage.getItem("name"),
              lat: this.state.markers[i][0],
              lng: this.state.markers[i][1]
            });
          }
        },
        null,
        options
      );
    } else {
      alert("Geolocation API is not supported in your browser.");
    }

    socket.on("newPosition", data => {
      console.log("new position");
      const { position } = this.state;
      console.log(position);
      for (var i = 0; i < position.length; i++) {
        if (position[i].name === data.name) {
          position.splice(i, 1);
        }
      }
      position.push({
        name: data.name,
        lat: data.lat,
        lng: data.lng
      });
      console.log("pos", position);

      this.setState({
        position: position
      });
    });
  };

  // distanceHandler = () =>{
  //   console.log("asddaasd");
  // }

  render() {
    return (
      <div>
        {this.state.position.map(pos => (
          <Marker key={pos.name} position={[pos.lat, pos.lng]} icon={L.icon(something[pos.name])}>            
            <Popup>
                {pos.name}
            </Popup>
          </Marker>
        ))}
        {this.state.markers.map(marker => (
          marker[2] ? 
          <Marker position={[marker[0],marker[1]]} icon={L.icon(something['Default'])}  />
          : null
        ))}
        {this.state.markers.map(marker => (
          marker[2] ? 
          this.state.markers.map(marker1 => (
          marker1[2] ? 
          <LINE x={marker[0]} y={marker[1]} x1={marker1[0]} y1={marker1[1]}/>
          : null
                ))
          : null
        ))}
      </div>
    );
  }
}

export default Mrk;
