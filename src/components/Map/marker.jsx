import React, { Component } from "react";
import { Marker } from "react-leaflet";
import openSocket from "socket.io-client";
import LINE from '../line/line';

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
          let markers = this.state.markers;
          for (i = 0; i < markers.length; i++) {
            if(Math.abs(markers[i][0] - position.coords.latitude) <= 0.000992 && Math.abs(markers[i][1] - position.coords.longitude) <= 0.001992)  
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
          <Marker key="1." position={[marker[0],marker[1]]} icon={L.icon({
    iconUrl: 'https://user-images.githubusercontent.com/23381512/56069674-d8354b80-5da1-11e9-867c-1d78e891b9d7.png',
    shadowUrl: 'https://user-images.githubusercontent.com/23381512/56069674-d8354b80-5da1-11e9-867c-1d78e891b9d7.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})} />
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
        {/* <LINE x="52.5069704" y="13.2846501" x1="29.946565" y1="76.818406"></LINE> */}

      </div>
    );
  }
}

export default Mrk;
//https://user-images.githubusercontent.com/23381512/56069674-d8354b80-5da1-11e9-867c-1d78e891b9d7.png