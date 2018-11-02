import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { logUserIn } from "../../actions/authActions";

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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    const currentUser = {
      username: this.state.username,
      password: this.state.password,
    }
    this.props.logUserIn(currentUser);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {

    const { errors } = this.state;

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
              className={classnames('', { 'invalid-input-field': errors.username })}
              value={this.state.username}
              onChange={this.onChange}
            />
            {errors.username && (<div className="invalid-input-message">{errors.username}</div>)}

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

Login.propTypes = {
  logUserIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,

}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,

})

export default connect(mapStateToProps, { logUserIn })(Login);