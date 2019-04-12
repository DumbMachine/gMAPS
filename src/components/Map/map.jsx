import React, { Component } from "react";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import * as helpers from "@turf/helpers";

import Marker from './marker';

class MAP extends Component {
  state = {
    lat: 29.946565,
    lng: 76.818406,
    zoom: 15,
    zoomOffset: 10,
    markers: [
      [29.946, 76.818],
      [29.9481, 76.819065],
      [29.94, 76.816],
      [29.94, 76.813],
      [29.9471, 76.812],
      [29.946681, 76.815]
    ],
    line1: {
      isActive: false,
      line: helpers.lineString(
        [[52.5069704, 13.2846501], [47.3775499, 8.4666755]].map(lngLat => [
          lngLat[1],
          lngLat[0]
        ])
      )
    },
    line2: {
      isActive: false,
      line: helpers.lineString(
        [[52.5069704, 13.2846501], [47.3775499, 8.4666755]].map(lngLat => [
          lngLat[1],
          lngLat[0]
        ])
      )
    },
    line3: {
      isActive: false,
      line: helpers.lineString(
        [[52.5069704, 13.2846501], [47.3775499, 8.4666755]].map(lngLat => [
          lngLat[1],
          lngLat[0]
        ])
      )
    },
    line4: {
      isActive: false,
      line: helpers.lineString(
        [[52.5069704, 13.2846501], [47.3775499, 8.4666755]].map(lngLat => [
          lngLat[1],
          lngLat[0]
        ])
      )
    },
    line5: {
      isActive: false,
      line: helpers.lineString(
        [[52.5069704, 13.2846501], [47.3775499, 8.4666755]].map(lngLat => [
          lngLat[1],
          lngLat[0]
        ])
      )
    },
    line6: {
      isActive: false,
      line: helpers.lineString(
        [[52.5069704, 13.2846501], [47.3775499, 8.4666755]].map(lngLat => [
          lngLat[1],
          lngLat[0]
        ])
      )
    },
    line7: {
      isActive: false,
      line: helpers.lineString(
        [[52.5069704, 13.2846501], [47.3775499, 8.4666755]].map(lngLat => [
          lngLat[1],
          lngLat[0]
        ])
      )
    }
  };

  line = helpers.lineString(
    [
      [52.5069704, 13.2846501],
      [47.3775499, 8.4666755],
      [51.5287718, -0.2416804]
    ].map(latLng => [latLng[1], latLng[0]])
  );

  render() {
    return (
      <div
        style={{
          overflow: 'hidden'
        }}
      >
        <Map
          style={{
            paddingBottom: "5%",
            height: "100vh",
            width: "100vw"
          }}
          center={[this.state.lat, this.state.lng]}
          zoom={this.state.zoom}
          zoomOffset={this.zoomOffset}
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/rustyraptor/cjkbednp4buod2rnwog2xrdtb/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicnVzdHlyYXB0b3IiLCJhIjoiY2prOXdtZ2E5MjN3ODNxbWVsM3NyNWlsZCJ9.AVHo6o9Z68w1c2lsBXuGDg"
          />
          <Marker />
          <GeoJSON data={this.line} />
        </Map>
      </div>
    );
  }
}

export default MAP;
