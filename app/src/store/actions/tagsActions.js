import {isAxiosAuthorized} from "../../helper";
import axios from "../../axios_config";
import {SET_TAGS} from "./../constants";

export const fetchTagsAndDocRefs = () => dispatch => {
  if (!isAxiosAuthorized())
    return;

  return axios.get('tags/')
    .then(res => {
      dispatch(setTags(res.data))
      return res
    })
    .catch(err => {
      return err.response
    });
};

export const setTags = (payload) => {
  return {
    type: SET_TAGS,
    data: payload
  }
}