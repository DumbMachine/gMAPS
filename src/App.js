import React, { Component } from 'react';
import MAP from "./components/Map/map";

class App extends Component {
  state={
    map: null
  }
  Handler = ()=>{
      this.setState({
        map: 1
      })
  }

  render() {
    return (
      <div className="App">
      <button placeholder="Something" onClick={this.Handler} ref="button">
        WOW
      </button>
      {this.state.map ?<MAP></MAP>:null}
      </div>
    );
  }
}

export default App;
