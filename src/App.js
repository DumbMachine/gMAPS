import React, { Component } from 'react';
import MAP from "./components/map";

class App extends Component {
  state={
    map: null
  }
  Handler = ()=>{
      this.setState({
        map: 1
      })
      // console.log(this.sta)
  }
  render() {
    return (
      <div className="App">
      <button placeholder="Something" onClick={this.Handler} ref="button"></button>
      {this.state.map ?<MAP></MAP>:null}
        
      </div>
    );
  }
}

export default App;
