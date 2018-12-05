import { isAxiosAuthorized } from "../../helper";
import axios from "../../axios_config";
import { SET_HL } from "../../store/constants"

export const fetchHighlights = () => dispatch => {
    if (!isAxiosAuthorized())
        return;

    return axios.get('annotate/all/')

        .then(res => {

            dispatch(set_hl(res.data))

            return res
        })
        .catch(err => {
            console.log(err);

            return err.response
        });
};

const set_hl = (payload) => {
    return {
        type: SET_HL,
        data: payload
    }
}