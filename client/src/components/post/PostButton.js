import React, { Component } from 'react'

export class PostButton extends Component {
  render() {
    return (
      <div>
        <button className="add-image">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    )
  }
}

export default PostButton
