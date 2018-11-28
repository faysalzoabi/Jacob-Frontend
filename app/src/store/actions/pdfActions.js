import { isAxiosAuthorized } from "../../helper";
import axios from "../../axios_config";
import { SET_PDFS } from "../constants";

export const fetchPdfs = (indexes) => dispatch => {
  if (!isAxiosAuthorized())
    return;


  let query_param = ''
  indexes.forEach((ind, index) => {
    let newParam = indexes.length - 1 > index ? 'param' + String(index) + '=' + String(ind) + '&' : 'param' + String(index) + '=' + String(ind)
    query_param = query_param + newParam
  })

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

export const fetchAllPdfs = () => dispatch => {

  if (!isAxiosAuthorized()) {
    console.log("not autho")
    return;
  }


  return axios.get(`file/get/all`)
    .then(res => {
      console.log("it is auth");
      dispatch(setAllPdfs(res.data))
      return res;
    })
    .catch(err => err.response);
};


export const setAllPdfs = (payload) => {
  return {
    type: SET_PDFS,
    data: payload
  }
}

