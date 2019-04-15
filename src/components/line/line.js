import React, { Component } from "react";
import { GeoJSON } from "react-leaflet";
import * as helpers from "@turf/helpers";

class LINE extends Component {
  render() {
    return (
      <div>
        <GeoJSON
          data={helpers.lineString(
            [[this.props.x, this.props.y], [this.props.x1, this.props.y1]].map(
              latLng => [latLng[1], latLng[0]]
            )
          )}
        />
      </div>
    );
  }
}

export default LINE;
