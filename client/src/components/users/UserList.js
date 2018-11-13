import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserProfiles } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import AppHeader from '../headers/AppHeader';
import PostButton from '../post/PostButton';
import UserSummary from './UserSummary';


export class UserList extends Component {
  componentDidMount() {
    this.props.getAllUserProfiles();
  }

  render() {
    const { profiles } = this.props.profile;
    let userSummaries;

    if ( profiles === null ) {
      console.log('whelp.')
    } else {
      if (profiles.length > 0){
        userSummaries = profiles.map(profile => (
          <UserSummary key={profile._id} profile={profile} />
        ));
      } else {
        userSummaries = <p>You must be the only user!</p>;
      }
    }

    return (
      <div className="container">
        <AppHeader />
        <PostButton />
        <main>
          {userSummaries}
        </main>
      </div>
    )
  }
}

UserList.propTypes = {
  getAllUserProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getAllUserProfiles})(UserList);
