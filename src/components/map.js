import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {geolocated} from 'react-geolocated';


class MAP extends Component { 
    state = {
        lat:0,
        lng:76.8204121,
        zoom: 15,
        zoomOffset: 10
    }
    getGeoLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
              })
            }
          )
        } else {
          console.log("error")
        }
      }
    render() {
        return (
            !this.props.isGeolocationAvailable
                ? <div>Your browser does not support Geolocation</div>
                    : 
            !this.props.isGeolocationEnabled
                ? <div>Geolocation is not enabled</div>
                    : 
            this.props.coords
                ? 
                <div style={{
                        paddingBottom: "5%",
                        height: "1000px",
                        width: "1800px"
                    }}>
                        <Map style={{
                        paddingBottom: "5%",
                        height: "1000px",
                        width: "1800px"}} center={[this.state.lat, this.state.lng]} zoom={this.state.zoom} zoomOffset={this.zoomOffset}>
                            <TileLayer
                                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="https://api.mapbox.com/styles/v1/rustyraptor/cjkbednp4buod2rnwog2xrdtb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnVzdHlyYXB0b3IiLCJhIjoiY2prOXdtZ2E5MjN3ODNxbWVsM3NyNWlsZCJ9.AVHo6o9Z68w1c2lsBXuGDg"/>
                            <Marker position={[this.props.coords.longitude, this.props.coords.longitude]}>
                                <Popup>
                                    A pretty CSS3 popup.
                                    <br/>
                                    Easily customizable.
                                </Popup>
                            </Marker>
                        </Map>
                    </div>
        : <div>Getting the location data&shellip; </div>);
        }
    
}
        
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 100,
    },
    watchPosition: true,
    userDecisionTimeout: null,
    suppressLocationOnMount: false,
    geolocationProvider: navigator.geolocation
})(MAP);
