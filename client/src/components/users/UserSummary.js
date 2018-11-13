import React, { Component } from 'react';
import PropTypes from 'prop-types';
import profileReducer from '../../reducers/profileReducer';

export class UserSummary extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="user-summary">
        <a href="user-profile.html" className="user-profile-summary">
          {profile.avatar ?
          <div className="profile-image">
            <img src={profile.avatar} />
          </div>
          :
          <div className="profile-image"> 
            <i className="far fa-user-circle"></i>
          </div>}
          <div>
            <p className="username">{profile.user.username}</p>
            <p className="full-name">{profile.user.fullName}</p>
          </div>
        </a>
        <button class="user-action-button summary follow-user">
          <i class="fas fa-plus"></i> Follow
        </button>
      </div>
    )
  }
}

UserSummary.propTypes = {
  profile: PropTypes.object.isRequired
};

export default UserSummary;
