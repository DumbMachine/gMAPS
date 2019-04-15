import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login';
import MAP from "./components/Map/map";
import Success from './components/success';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Route exact path='/' component={Login}/>
        <Route path='/map' component={MAP}/>
        <Route path='/success' component={Success}/>
      </BrowserRouter>
    );
  }
}

export default App;
