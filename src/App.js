import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Wallet from './pages/Wallet';
import store from './redux/store';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Switch>
          <Route exact path="/trybewallet" component={ Login } />
          <Route exact path="/trybewallet/carteira" component={ Wallet } />
        </Switch>
      </Provider>
    );
  }
}

export default App;
