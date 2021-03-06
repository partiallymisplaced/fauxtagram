import axios from 'axios';

import { 
  GET_POST, 
  GET_POSTS, 
  ADD_POST, 
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

export const getPosts = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
      )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

export const addPost = postData => dispatch => {
  // dispatch(clearErrors());
  axios
    .post('/api/posts', postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}