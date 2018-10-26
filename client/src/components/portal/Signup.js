import React, { Component } from 'react'
import { Link } from "react-router-dom";

class Signup extends Component {
  render() {
    return (
      <div className="container">
        <main>
          <h2>Sign Up</h2>
          <form action="submit">
            <label htmlFor="username">Userame</label>
            <input type="text" name="username" id="username" placeholder="username" />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="email" />

            <label htmlFor="full-name">Full Name</label>
            <input type="text" name="full-name" id="full-name" placeholder="full name" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="password" />

            <input type="submit" name="sign-up" id="sign-up" value="Sign Up" />
          </form>
          <p>Already registered? <Link to="/login">Log in.</Link></p>
        </main>
      </div>
    )
  }
}

export default Signup;