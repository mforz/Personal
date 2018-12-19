import React, { Component } from 'react';
import Content from '../../compontent/content.js';
class Home extends Component {
  render() {
    return (
      <div className="home">
        <div>

        </div>
        {
            Content(
                <div>
                    hello luu
                </div>
            )
        }
      </div>
    );
  }
}

export default Home;
