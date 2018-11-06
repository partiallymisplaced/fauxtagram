import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Post extends Component {
  static propTypes = {

  }

  render() {
    return (
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
          <img src="https://images.unsplash.com/photo-1539934675566-f6889aa8f6a2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=148236f5e96a5fc0076a4d13128751bd&auto=format&fit=crop&w=802&q=80" alt=""/>
            <button className="like-button not-liked">
              <i className="far fa-heart"></i>
            </button>
        </div>

          <div className="post-info">
            <div className="post-likes">
              <p>0 likes</p>
            </div>

            <div className="post-comment">
              <p><span className="post-comment-author">Username </span> Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type
              specimen book.</p>
            </div>
            <div className="post-comment">
              <p><span className="post-comment-author">Username </span> Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type
              specimen book.</p>
            </div>
            <div className="post-comment">
              <p><span className="post-comment-author">Username </span> Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type
              specimen book.</p>
            </div>


            <div className="add-comment">
              <input type="text" placeholder="Add a comment" />
                <input type="button" value="Post" class="button button-secondary" />
          </div>

        </div>

            </div>

    )
  }
}

export default Post;
