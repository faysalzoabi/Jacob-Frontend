import { isAxiosAuthorized } from "../../helper";
import axios from "../../axios_config";

export const postAnnotations = (state) => dispatch => {
    if (!isAxiosAuthorized())
        return;

    return axios.post('annotate/',
        { ...state }
    )
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            return err.response
        });
}

// export const setAnnotations = (payload) => {

// }