import React, { Component } from 'react';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Feed from './components/feed/Feed';
import UserList from './components/users/UserList';
import Profile from './components/profile/Profile';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logUserOut } from './actions/authActions';

if (localStorage.jwtToken) {
  // Sets auth
  setAuthToken(localStorage.jwtToken);
  const decodedToken = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedToken));
  // Logs out timeout
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    store.dispatch(logUserOut());
    window.location.href='/login';
  }
}


class App extends Component {
  render() {
    return (
        <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/' component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/userlist" component={UserList} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
