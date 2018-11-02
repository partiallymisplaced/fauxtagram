import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Signup from './components/portal/Signup';
import Login from './components/portal/Login';
import Bubbles from './components/layout/Bubbles';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';



class App extends Component {
  render() {
    return (
        <Provider store={store}>
        <Router>
          <div className="pre-auth">
            <Header />
            <Route exact path='/' component={Signup} />
            <Route exact path="/login" component={Login} />
            <Bubbles />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
