import axios from 'axios';
import { 
  GET_ERRORS, 
  GET_PROFILE, 
  GET_ALL_PROFILES 
} from './types'

// Get user profile
export const getUserProfile = () => 
  dispatch => {
    axios.get('/api/profile')
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
       
      }))
    .catch(err => dispatch({
      // type: GET_ERRORS,
      // payoad: err.response.data
      type: GET_PROFILE,
      payload: null
    }))
  }
  
// Get all user profiles
export const getAllUserProfiles = () => 
  dispatch => {
  // dispatch(setProfileLoading());
  axios.get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: null
      })
    );
};
