import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';

export class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      comment: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      url: this.state.url,
      comment: this.state.comment,
      username: user.username,
      // avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ 
      url: '',
      comment: ''
    });
    this.props.history.push('/feed')
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  render() {
    const { errors } = this.state;

    return (
      <main className="post-form">
        <div className="post-form-container">
          <form  
            onSubmit={this.onSubmit}
            noValidate>
            <h2>Post an image</h2>

            <label htmlFor="url">URL</label>
            <input
              name="url" 
              type="text" 
              id="url" 
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange}
              error={errors.url}
              />

            <label htmlFor="comment">Comment</label>
            <textarea 
              name="comment" 
              id="" 
              cols="30" 
              rows="5" 
              placeholder="Add a comment ..."
              value={this.state.comment}
              onChange={this.onChange}
              error={errors.comment}
              >
              </textarea>

            <div className="post-form-button-group">
              <Link to={'/feed'} className="button-fix">
                <input type="button" 
                  value="Cancel" 
                  className="button-secondary" />
              </Link>
              <input type="submit" 
                value="Post image" 
                className="button-primary" />
            </div>
          </form>
        </div>
      </main>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
