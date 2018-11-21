import axios from './../../axios_config';
import { isAxiosAuthorized } from './../../helper';

import {SET_USER, UNSET_USER} from '../constants';

export const setUser = userData => {
  return {
    type: SET_USER,
    data: userData
  };
};

export const unsetUser = () => {
  localStorage.clear();
  return {
    type: UNSET_USER,
  };
};

export const fetchUser = () => dispatch => {
  if(!isAxiosAuthorized())
    return;

  return axios.get('profile/info/')
    .then(res => {
      const action = setUser(res.data);
      dispatch(action);
      return res;
    })
    .catch(err => err.response);
};

export const updatePassword = password_data => (dispatch) => {
  if(!isAxiosAuthorized())
    return;

  return axios.patch('auth/password-reset/', password_data)
    .then((res) => {
      const action = fetchUser();
      dispatch(action);
      return res;
    })
    .catch(err => err.response); // TODO: catch case when username is already taken.
};

export const updateUser = user_data => (dispatch) => {
  if(!isAxiosAuthorized())
    return;

  return axios.patch('profile/credentials/', user_data)
    .then((res) => {
      const action = fetchUser();
      dispatch(action);
      return res;
    })
    .catch(err => err.response); // TODO: catch case when username is already taken.
};

export const updateUserProfile = user_profile_data => (dispatch) => {
  if(!isAxiosAuthorized())
    return;

  const data = {
    city: user_profile_data.city,
    country: user_profile_data.country,
    disease_interests: String(user_profile_data.disease_interests), // TODO: check api, should this really be a string?
  };

  return axios.patch('profile/info/', data)
    .then(() => {
      const action = fetchUser();
      dispatch(action);
    });
};
