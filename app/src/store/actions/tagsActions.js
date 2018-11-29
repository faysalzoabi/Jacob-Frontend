import { isAxiosAuthorized } from "../../helper";
import axios from "../../axios_config";
import { SET_TAGS, SET_PHRASES } from "./../constants";


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


export const fetchKeyPhrasesOfTag = (tag_id) => dispatch => {
  if (!isAxiosAuthorized())
    return;

  return axios.get(`tags/phrases/${tag_id}/`)
    .then(res => {
      dispatch(setPhrases(res.data))
      return res
    })
    .catch(err => {
      return err.response
    });
};

export const setPhrases = (payload) => {
  return {
    type: SET_PHRASES,
    data: payload
  }
}

