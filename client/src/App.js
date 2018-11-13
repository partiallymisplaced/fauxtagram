import React, { Component } from 'react';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Feed from './components/feed/Feed';
import UserList from './components/users/UserList';
import './App.css';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decodedToken = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedToken));
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
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
