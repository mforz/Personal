import React, { Component } from 'react';
import Menu from '../Menu/'
import Route from '../../routers/'
import '../../assets/index.css'

class Home extends Component {

  componentDidMount(){
  }
  render() {
    return (
      <div className="home" style={styles.homepage}>
        <div>
          <Menu />
        </div>
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
