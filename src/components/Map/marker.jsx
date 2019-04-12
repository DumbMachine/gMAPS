import React, { Component } from "react";
import { Marker } from "react-leaflet";
import openSocket from "socket.io-client";
import LINE from '../line/line';

class Mrk extends Component {
  state = {
    position: [],
    markers: [
      [29.94692,76.81883, 0],
      [29.94820,76.81905, 0],
      [29.94857,76.81601, 0],
      [29.94898,76.81320, 0],
      [29.94720,76.81287, 0],
      [29.94678,76.815685, 0]
    ],
    something: 0
  };

  componentWillMount = () => {
    const socket = openSocket("http://localhost:8069");
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
          for (i = 0; i < this.state.markers.length; i++) {
            if(Math.abs(this.state.markers[i][0] - position.coords.latitude) <= 0.00192 && Math.abs(this.state.markers[i][1] - position.coords.longitude) <= 0.00197)  
            console.log(this.state.markers[i])
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

  distanceHandler = () =>{
    console.log("asddaasd");
  }

  render() {
    return (
      <div>
        {this.state.position.map(pos => (
          <Marker key={pos.name} position={[pos.lat, pos.lng]} />
        ))}
        {this.state.markers.map(marker => (
          marker[2] ? 
          <Marker key="1." position={[marker[0],marker[1]]} />
          : null
        ))}
        <LINE x="52.5069704" y="13.2846501" x1="29.946565" y1="76.818406"></LINE>

      </div>
    );
  }
}

export default Mrk;
