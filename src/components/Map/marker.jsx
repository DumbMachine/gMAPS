import React, { Component } from "react";
import { Marker } from "react-leaflet";

class Mrk extends Component {
  state = {
    lat: 29.9,
    lng: 76.8204121
  };

  componentDidMount = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        position => {
          console.log(position.coords);
          if (position.coords) {
            this.setState({ lat: position.coords.latitude });
            this.setState({ lng: position.coords.longitude });
          }
        },
        null,
        options
      );
    } else {
      alert("Geolocation API is not supported in your browser.");
    }
  };

  render() {
    return (
      <Marker position={[this.state.lat, this.state.lng]}>
      </Marker>
    );
  }
}

export default Mrk;
