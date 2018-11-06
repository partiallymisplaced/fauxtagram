import React, { Component } from 'react';

export class ProfileHeader extends Component {
  render() {
    return (
      <div>
        <header>
          <a href="#" className="header-icon">
            <i className="fas fa-home"></i>
          </a>
          <a href="#">
            <h1 className="logo">Fauxtagram</h1>
          </a>
          <a href="/profile-current.html" className="header-icon">
            <i className="fas fa-user-circle"></i>
          </a>
        </header>
      </div>
    )
  }
}

export default ProfileHeader;
