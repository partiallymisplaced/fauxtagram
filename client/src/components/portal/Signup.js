import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      fullName: '',
      password: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(e){
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      fullName: this.state.fullName,
      password: this.state.password,
    }

    axios.post('/api/users/signup', newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
  }

  render() {

    const {errors} = this.state;

    return (
      <div className="container">
        <main>
          <h2>Sign Up</h2>
          <form
            onSubmit={this.onSubmit}
            noValidate 
          >
            <label htmlFor="username">Userame</label>
            <input type="text" 
              name="username" 
              id="username" 
              placeholder="username"
              className={classnames('', { 'invalid-input-field': errors.username })} 
              value={this.state.username} 
              onChange={this.onChange}            
            />
            {errors.username && (<div className="invalid-input-message">{errors.username}</div>)}

            <label htmlFor="email">Email</label>
            <input type="email" 
              name="email" 
              id="email"
              className={classnames('', { 'invalid-input-field': errors.email })} 
              placeholder="email" 
              value={this.state.email} 
              onChange={this.onChange}            
            />
            {errors.email && (<div className="invalid-input-message">{errors.email}</div>)}

            <label htmlFor="full-name">Full Name</label>
            <input type="text" 
              name="fullName" 
              id="full-name" 
              placeholder="full name" 
              value={this.state.fullName} 
              onChange={this.onChange}            
            />

            <label htmlFor="password">Password</label>
            <input type="password"
              name="password" 
              id="password" 
              placeholder="password"
              className={classnames('', { 'invalid-input-field': errors.username })} 
              value={this.state.password} 
              onChange={this.onChange}            
            />
            {errors.password && (<div className="invalid-input-message">{errors.password}</div>)}

            <input type="submit" 
              name="sign-up"
              id="sign-up" 
              value="Sign Up" 
            />
          </form>

          <p>Already registered? 
            <Link to="/login"> Log in.</Link>
          </p>
        </main>
      </div>
    )
  }
}

export default Signup;