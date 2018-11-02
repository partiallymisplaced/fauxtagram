import { GET_ERRORS } from '../actions/types';

const initalState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initalState, action){
  switch(action.type){
    case GET_ERRORS:
      return {
        ...state,
        user: action.payload
      }
    default: 
      return state;
  }
}