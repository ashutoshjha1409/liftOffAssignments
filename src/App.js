import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Container from './components/Container';
import './App.css';
import './circle.css';

injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
	    <Container />
	  </MuiThemeProvider>
    );
  }
}

export default App;
