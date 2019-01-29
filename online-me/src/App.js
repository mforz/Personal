import React, { Component } from 'react';
import Home from './pages/Home'
class App extends Component {
  render() {
    return (
      <div className="App" style={styles.app}>
        <Home />
      </div>
    );
  }
}

export default App;
const styles={
  app:{
    width:'100%',
    height:'100%',
  }
}
