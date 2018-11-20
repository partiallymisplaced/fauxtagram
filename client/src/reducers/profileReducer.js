import { GET_PROFILE, GET_ALL_PROFILES } from '../actions/types';

const intialState = {
  profile: null,
  profiles: null,
}

export default function(state = intialState, action){
  switch(action.type) {
    case GET_PROFILE: 
      return {
        ...state,
        profile: action.payload
      };
    case GET_ALL_PROFILES: 
      return {
        ...state,
        profiles: action.payload
      }
    default: 
      return state;
  }
}