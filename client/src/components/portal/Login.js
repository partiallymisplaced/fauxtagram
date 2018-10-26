import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div className="container">
        <main>
        <h2>Log In</h2>
        <form action="submit">
          <label htmlFor="username">Userame</label>
          <input type="text" name="username" id="username" placeholder="username" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="password" />

          <input type="submit" name="log-in" id="log-in" value="Log in" />
        </form>
        <p>Not registered? <Link to="/">Sign up.</Link></p>
        </main>
      </div>
        
    )
  }
}

export default Login;