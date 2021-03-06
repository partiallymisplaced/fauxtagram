import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileHeader from '../headers/ProfileHeader';
import PostButton from '../post/PostButton';
import { getUserProfile } from '../../actions/profileActions';


export class Profile extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const { posts } = this.props.post;

    let profileSummary;

    if (profile === null) {
      profileSummary = ( 
      <div>
          <div className="user-profile">
            <div className="user-profile-avatar">
              <i className="far fa-user-circle"></i>
            </div>

            <div className="user-profile-info">
              <p className="username">{user.username}</p>
              <p className="full-name"></p>
              <Link to={'/'} href={profile.website} target="_blank" className="website"></Link>

              <button className="user-action-button profile edit-profile">
                <i className="fas fa-pen"></i> Edit profile
              </button>

              <p className="bio"></p>

              <div className="user-stats">
                <div className="posts">
                  <span className="stat-highlight">{posts.length}</span> posts
                </div>
                <div className="following">
                  <span className="stat-highlight">0</span> following
                </div>
                <div className="followers">
                  <span className="stat-highlight">0</span> followers
                </div>
              </div>
            </div>
          </div>
      </div>       
      )
      console.log('No profiles in Profile.')
    } else {
      profileSummary = (
        <div>
          <div className="user-profile">
            {profile.avatar ?
              <div className="user-profile-avatar">
                <img src={profile.avatar} alt={user.username}/>
              </div>
              :
              <div className="user-profile-avatar">
                <i className="far fa-user-circle"></i>
              </div>
            }

            <div className="user-profile-info">
              <p className="username">{user.username}</p>
              <p className="full-name">{user.fullName}</p>
              <Link to='{profile.website}' className="website"> target="_blank"{profile.website}</Link>

              <button className="user-action-button profile edit-profile">
                <i className="fas fa-pen"></i> Edit profile
              </button>

              <p className="bio">{profile.bio}</p>

              <div className="user-stats">
                <div className="posts">
                  <span className="stat-highlight">{profile.posts.length}</span> posts
                </div>
                <div className="following">
                  <span className="stat-highlight">{profile.followers.length}</span> following
                </div>
                <div className="followers">
                  <span className="stat-highlight">{profile.following.length}</span> followers
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div className="container">
          {/* <AppHeader /> */}
          <ProfileHeader />
          <PostButton />
          <main>
            <div>{profileSummary}</div>
          </main>
        </div>
      </div>
    )
  }
}

Profile.propTypes = { 
  getUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  posts: PropTypes.array
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
})

export default connect(mapStateToProps, { getUserProfile })(Profile);