/* eslint-disable no-console */
import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { Normalize } from 'styled-normalize';
import socketManager from './utils/socketManager';
import Index  from './pages/index';

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Normalize />
        <Switch>
          <Route 
            exact
            path='/'
            component={Index}
          />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    );
  }
  componentWillUnmount(){
    // Disconnect from socket
  }
}

export default withRouter(App);
