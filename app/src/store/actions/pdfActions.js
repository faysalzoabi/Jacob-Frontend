import {isAxiosAuthorized} from "../../helper";
import axios from "../../axios_config";
import {SET_TAGS, SET_PDFS} from "../constants";

export const fetchPdfs = (indexes) => dispatch => {
  if (!isAxiosAuthorized())
    return;
  console.log("indexes", indexes)

  let query_param = ''
  indexes.forEach((ind, index) => {
    let newParam = indexes.length -1 > index ? 'param' + String(index) + '=' + String(ind) + '&' : 'param' + String(index) + '=' + String(ind)
    query_param = query_param + newParam
  })

  console.log(`file/get/?${query_param}`)

  return axios.get(`file/get/?${query_param}`)
    .then(res => {
      dispatch(setPdfs(res.data))
      return res;
    })
    .catch(err => err.response);
};



export const setPdfs = (payload) => {
  return {
    type: SET_PDFS,
    data: payload
  }
}