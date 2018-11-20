import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PostForm from './PostForm';

export class PostButton extends Component {
  render() {
    return (
      <div>
        <Link to={'/post'}>
          <button className="add-image">
            <i className="fas fa-plus"></i>
          </button>
        </Link>
      </div>
    )
  }
}

export default PostButton
