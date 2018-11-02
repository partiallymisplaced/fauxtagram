import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

// Signs user up
export const signUserUp = (userData, history) =>
  dispatch => {
    axios.post('/api/users/signup', userData)
      .then(res => history.push('/login'))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }))
  }

// Logs user in
export const logUserIn = (userData) =>
  dispatch => {
    axios.post('/api/users/login', userData)
      .then(res => {
        // Saves token from response to localStorage
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        // Sends token over to auth header 
        setAuthToken(token);
        // Decodes token
        const decodedToken = jwt_decode(token);
        dispatch(setCurrentUser(decodedToken));

      })
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }))
  }

export const setCurrentUser = decodedToken => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken,
  }
}