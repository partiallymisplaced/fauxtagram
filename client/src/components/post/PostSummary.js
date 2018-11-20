import React, { Component } from 'react';

export class PostSummary extends Component {

  render() {
    const { post } = this.props;

    return (
      <div>
        <div className="post">
          <div className="post-author">
            <a href="user-profile.html">
              <div className="profile-image">
                <i className="far fa-user-circle"></i>
              </div>
              <p>{post.username}</p>
            </a>
          </div>

          <div className="post-image">
            <img src={post.url} alt={post.comment} />
            <button className="like-button not-liked">
              <i className="far fa-heart"></i>
            </button>
          </div>

          <div className="post-info">
            <div className="post-likes">
              <p>{post.likes.length} likes</p>
            </div>

            <div className="post-comment">
              <p><span className="post-comment-author">{post.username} </span> {post.comment}</p>
            </div>

            <div>
              <a href="post.html">View all comments</a>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default PostSummary;
