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

    return (
      <div className="container">
        <ProfileHeader />
        <PostButton />
        <main>
          {posts.map(post => (
          <PostSummary post={post} key={post._id}/>
          ))}
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