import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';

class App extends Component {

  componentDidMount() {
    const payload = {
      query: `
query find ($film: Int) {
  find_film(id: $film) {
    title
    producers
    characters(limit: 2) {
      name
      homeworld {
        name
      }
    }
  }
}
`,
      variables: {
        film: 1
      }
    };

    axios.post('/graphql', payload)
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
