import {
  GET_POSTS, 
  GET_POST,
  ADD_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS: 
      return {
        ...state,
        posts: action.payload
      }
    case GET_POST: 
      return {
        ...state,
        posts: action.payload
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    default: 
      return state;
  }
}