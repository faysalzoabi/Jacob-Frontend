import {SET_TOKEN, UNSET_TOKEN} from '../constants';
import {fetchUser} from './userActions';

import axios from './../../axios_config';

export const setToken = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  return {
    type: SET_TOKEN,
    data: token
  };
};

export const unsetToken = () => {
  axios.defaults.headers.common['Authorization'] = undefined;
  return {
    type: UNSET_TOKEN,
  };
};

export const loginUser = credentials => dispatch => {
  const data = {
    username: credentials.username,
    password: credentials.password
  };

  return axios.post('token/', data)
    .then(res => {
      if (res.data.non_field_errors === undefined) {
        localStorage.setItem('token', JSON.stringify(res.data.access));
        const tokenAction = setToken();
        dispatch(tokenAction);
        const action = fetchUser();
        dispatch(action);
      }
      return res.data;
    }).catch(error => {
      console.log(error)
      return error.response.data;
    });
};
