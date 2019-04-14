import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";
import openSocket from "socket.io-client";
import LINE from "../line/line";
import persons from "../icon/icon";

import L from "leaflet";

// import faceIcon from '../icon/icon'
class Mrk extends Component {
  state = {
    position: [],
    markers: [
      [29.94692, 76.81883, 0, 1, "Rishabh"],
      [29.9482, 76.81905, 0, 2, "Pankaj"],
      [29.94857, 76.81601, 0, 3, "Narendra"],
      [29.94898, 76.8132, 0, 4, "Paragi"],
      [29.9472, 76.81287, 0, 5, "Karan"],
      [29.94678, 76.815685, 0, 6, "Arpit"]
    ]
  };

  componentWillMount = () => {
    const socket = openSocket("https://gawds.ml");
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

          //CHECKING POSITION
          let markers = this.state.markers;
          const name = window.localStorage.getItem("name");
          for (i = 0; i < markers.length; i++) {
            console.log(Math.abs(markers[i][0] - position.coords.latitude));
            console.log(Math.abs(markers[i][1] - position.coords.longitude));
            if (
              Math.abs(markers[i][0] - position.coords.latitude) <=
                0.0005395999999997514 &&
              Math.abs(markers[i][1] - position.coords.longitude) <=
                0.0007308999999935395 && name === markers[i][4]
            ) {
              markers[i][2] = 1;
            } else if (name == markers[i][4]) {
              markers[i][2] = 0;
            }
            this.setState({
              markers: markers
            });
          }

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

      for (let i = 0; i < position.length; i++) {
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

      let markers = this.state.markers;
      for (let i = 0; i < markers.length; i++) {
        console.log(Math.abs(markers[i][0] - data.lat));
        console.log(Math.abs(markers[i][1] - data.lng));
        if (
          Math.abs(markers[i][0] - data.lat) <= 0.0005395999999997514 &&
          Math.abs(markers[i][1] - data.lng) <= 0.0007308999999935395 &&
          data.name === markers[i][4]
        ) {
          markers[i][2] = 1;
        } else if (data.name === markers[i][4]) {
          markers[i][2] = 0;
        }
        this.setState({
          markers: markers
        });
      }
    });
  };

  render() {
    return (
      <div>
        {this.state.position.map(pos =>
          pos.name in persons ? (
            <Marker
              key={pos.name}
              position={[pos.lat, pos.lng]}
              icon={L.icon(persons[pos.name])}
            >
              <Popup>{pos.name}</Popup>
            </Marker>
          ) : (
            <Marker
              key={pos.name}
              position={[pos.lat, pos.lng]}
              icon={L.icon(persons["No name"])}
            >
              <Popup>{pos.name}</Popup>
            </Marker>
          )
        )}
        {this.state.markers.map(marker =>
          marker[2] ? (
            <Marker
              key={marker[3]}
              position={[marker[0], marker[1]]}
              icon={L.icon(persons["Default"])}
            >
              <Popup>{marker}</Popup>
            </Marker>
          ) : null
        )}
        {this.state.markers.map(marker =>
          marker[2]
            ? this.state.markers.map(marker1 =>
                marker1[2] ? (
                  marker[3] === marker1[3] + 1 || (marker[3] === marker1[3] - 1) ||
                  (marker[3] === 3 && marker1[3] === 6) ? (
                    <LINE
                      key={marker[3]}
                      x={marker[0]}
                      y={marker[1]}
                      x1={marker1[0]}
                      y1={marker1[1]}
                    />
                  ) : null
                ) : null
              )
            : null
        )}
      </div>
    );
  }
}

export default Mrk;
