import React, { Component } from 'react';
import Content from '../../compontent/content.js';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div>
          hello lulu 
        </div>
      </div>
    );
  }

}

Home = Content(Home)

export default Home;
