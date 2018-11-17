import React, { Component } from 'react';
import ProfileHeader from '../headers/ProfileHeader';
import PostButton from '../post/PostButton';
import PostSummary from '../post/PostSummary';
import { getPosts } from '../../actions/postActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Feed extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props.post;
    let postContent;

    if (posts === null) {
      postContent = (<p>No posts</p>)
    } else {
      postContent = (<p>Yes posts</p>)
    }
    
    return (
      <div className="container">
        <ProfileHeader />
        <PostButton />
        <main>
          {posts.map(post => (
          <PostSummary post={post} id={post._id}/>
          ))}
          <div className="post">
            <div className="post-author">
              <a href="user-profile.html">
                <div className="profile-image">
                  <i className="far fa-user-circle"></i>
                </div>
                <p>Username</p>
              </a>
            </div>

            <div className="post-image">
              <img src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=399e8236271202c6ed14adb4674b8138&auto=format&fit=crop&w=1506&q=80"
                alt="" />
              <button className="like-button liked">
                <i className="fas fa-heart"></i>
              </button>
            </div>

            <div className="post-info">
              <div className="post-likes">
                <p>1 like</p>
              </div>
              <div className="post-comment">
                <p><span className="post-comment-author">Username </span> Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
                  a type
            specimen book.</p>
              </div>
              <div>
                <a href="#">View all comments</a>
              </div>
            </div>
          </div>
      </main>
    </div>

    )
  }
}

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Feed);