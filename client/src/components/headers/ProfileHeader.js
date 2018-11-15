import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logUserOut } from "../../actions/authActions";

export class ProfileHeader extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logUserOut();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <div>
        <Link to="/profile" 
          className="log-out">Profile
        </Link>
        
        <Link to="/" 
          className="log-out" 
          onClick={this.onLogoutClick.bind(this)}>Log out
        </Link>
      </div>
    )

    const guestLinks = (
      <div>
        <Link to="/" className="log-out">Sign up</Link>
        <Link to="/login" className="log-out">Log in</Link>
      </div>
    )

    return (
      <div>
        <header>
          <Link to="/feed" className="header-icon">
            <i className="fas fa-home"></i>
          </Link>
          <Link to="/feed">
            <h1 className="logo">Fauxtagram</h1>
          </Link>
          { isAuthenticated ? authLinks : guestLinks }
        </header>
      </div>
    )
  }
}

ProfileHeader.propTypes = {
  logUserOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logUserOut })(ProfileHeader);