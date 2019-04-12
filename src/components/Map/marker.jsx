import React, { Component } from "react";
import { Marker } from "react-leaflet";
import openSocket from "socket.io-client";

class Mrk extends Component {
  state = {
    position: [],
    markers: [
      [29.946, 76.818],
      [29.9481, 76.819065],
      [29.94, 76.816],
      [29.94, 76.813],
      [29.9471, 76.812],
      [29.946681, 76.815]
    ],
  };

  componentWillMount = () => {
    const socket = openSocket("http://localhost:8000");
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

  render() {
    return (
      <div>
        {this.state.position.map(pos => (
          <Marker key={pos.name} position={[pos.lat, pos.lng]} />
        ))}
      </div>
    );
  }
}

export default Mrk;
