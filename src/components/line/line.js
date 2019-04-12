import React, { Component } from "react";
import { GeoJSON } from "react-leaflet";
import * as helpers from "@turf/helpers";


class LINE extends Component {
  state = {
    lat: 29.946565,
    lng: 76.818406,
    line: null
  };


  componentDidMount = () =>{
    // this.setState({
    //   line : helpers.lineString([
    //     [52.5069704,13.2846501],
    //     [47.3775499,8.4666755],
    //     [51.5287718,-0.2416804],
    //   ].map(latLng => [latLng[1],latLng[0]]))
    // })
    console.log("seomthin")
  }

  render() {
    return (
      <div>
        <GeoJSON data={helpers.lineString([
        [this.props.x,this.props.y],
        [this.props.x1,this.props.y1]
      ].map(latLng => [latLng[1],latLng[0]]))} />
      </div>
    );
  }
}

export default LINE;
