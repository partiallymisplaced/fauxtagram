import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);    
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e){
    e.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <main>
          <h2>Log In</h2>
          <form
            onSubmit={this.onSubmit}
            noValidate
          >
            <label htmlFor="username">Userame</label>
            <input type="text" 
              name="username" 
              id="username" 
              placeholder="username" 
              value={this.state.username}
              onChange={this.onChange}
            /> 

            <label htmlFor="password">Password</label>
            <input type="password" 
              name="password" 
              id="password" 
              placeholder="password" 
              value={this.state.password}
              onChange={this.onChange} 
            />

            <input type="submit" 
              name="log-in"
              id="log-in" 
              value="Log in" />
          </form>

          <p>Not registered? 
            <Link to="/">Sign up.</Link>
          </p>
        </main>
      </div>
        
    )
  }
}

export default Login;