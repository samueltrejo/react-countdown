import React from 'react';

import Display from './components/display';

import './styles/app.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Display />
      </div>
    );
  }
}

export default App;
