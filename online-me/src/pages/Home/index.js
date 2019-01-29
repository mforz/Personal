import React, { Component } from 'react';
import Music from '../Music/'
import '../../assets/index.css'

class Home extends Component {

  componentDidMount(){
  }
  render() {
    return (
      <div className="home" style={styles.homepage}>
        <Music />
      </div>
    );
  }
}

export default Home;
const styles={
  homepage:{
    width:'100%',
    height:'100%',
    backgroundColor:'#FCFCFC',
  }
}
