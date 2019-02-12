import React, { Component } from 'react';
import  Route  from '@/routers/';
import '@/assets/index.css'

class App extends Component {
  render() {
    return (
      <div id="app">
         <Route />
      </div>
    );
  }
}

export default App;
