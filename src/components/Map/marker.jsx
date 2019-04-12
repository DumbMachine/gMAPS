import React, { Component } from "react";
import { Marker } from "react-leaflet";
import openSocket from "socket.io-client";

class Mrk extends Component {
  state = {
    lat: 29.9,
    lng: 76.8204121
  };

  componentDidMount = () => {
    const socket = openSocket("http://localhost:8000");
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          this.setState({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          socket.emit("updatePosition", {
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
      console.log(data);
    });
  };

  render() {
    return (
      <div>
        <Marker position={[this.state.lat, this.state.lng]} />
        <Marker position={[29, 76]} />
      </div>
    );
  }
}

export default Mrk;
