import React, { Component } from 'react';
import AuthHeader from './AuthHeader';
import Bubbles from './Bubbles';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { signUserUp } from '../../actions/authActions';


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
    this.props.signUserUp(newUser, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  render() {

    const { errors } = this.state;

    return (
      <div  className="pre-auth">
        <AuthHeader/>
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
        <Bubbles/>
      </div>
    )
  }
}

Signup.propTypes = {
  signUserUp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,

})

export default connect(mapStateToProps, {signUserUp})(Signup);