import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ProfileForm extends Component {
  static propTypes = {

  }

  render() {
    return (
      <form action="post" class="edit-user-profile">
        <div class="user-profile-avatar">
          <i class="far fa-user-circle"></i>
        </div>
        <label for="username">Username</label>
        <input type="text" id="username" placeholder="username" />

        <label for="full-name">Full name</label>
        <input type="text" id="full-name" placeholder="full name" />

        <label for="website">Website</label>
        <input type="text" id="website" placeholder="website" />

        <label for="bio">Bio</label>
        <textarea name="" id="" cols="30" rows="5"></textarea>

        <div class="button-group">
        <input type="button" value="Cancel" class="button-secondary" />
        <input type="button" value="Update profile" class="button-primary" />
        </div>
      </form>
    )
  }
}

export default ProfileForm;
