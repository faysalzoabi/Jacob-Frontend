import {isAxiosAuthorized} from "../../helper";
import axios from "../../axios_config";

export const postAnnotations = (state) => dispatch => {
    if (!isAxiosAuthorized())
        return;

    console.log("posting annotations", state)
    
    return axios.post('annotate/', {...state})
      .then(res => {
      })
      .catch(err => {
          return err.response
      });
}
