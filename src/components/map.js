import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

class MAP extends Component {
  state = {
    lat: 29.9,
    lng: 76.8204121,
    zoom: 15,
    zoomOffset: 10,
  };


  componentDidMount = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
        console.log(position.coords);
        if (position.coords) {
          this.setState({ lat: position.coords.latitude });
          this.setState({ lng: position.coords.longitude });
        }
      }, null, options);
    } else {
      alert("Geolocation API is not supported in your browser.");
    }
  };


  render() {
    return (
      <div
        style={{
          paddingBottom: "5%",
          height: "1000px",
          width: "1800px"
        }}
      >
        <Map
          style={{
            paddingBottom: "5%",
            height: "100vh",
            width: "100vw"
          }}
          animate={true}
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          zoomOffset={this.zoomOffset}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/rustyraptor/cjkbednp4buod2rnwog2xrdtb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnVzdHlyYXB0b3IiLCJhIjoiY2prOXdtZ2E5MjN3ODNxbWVsM3NyNWlsZCJ9.AVHo6o9Z68w1c2lsBXuGDg"
          />
          <Marker position={[this.state.lat, this.state.lng]}>

          </Marker>
        </Map>
      </div>
    );
  }
}

export default MAP;
