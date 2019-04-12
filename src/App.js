import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login';
import MAP from "./components/Map/map";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Login}/>
        <Route path='/map' component={MAP}/>
      </BrowserRouter>
    );
  }
}

export default App;
