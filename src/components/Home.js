import React, { Component } from 'react';
import Users from './Users';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Edward Sharp and the magnetic zeros</h1>
        <div>
          <Users />
        </div>
      </div>
    );
  }
}

export default Home;
