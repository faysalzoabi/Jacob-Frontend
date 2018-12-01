import {SET_DATAPOINTS_PDFS, SET_ANNOTATION_PDF, SET_ALL_PDFS} from '../constants';

const initialState = {
    all_pdfs: [],
    datapoint_pdfs: [],  // Array of pdf objects to be displayed in Datapoints section.
    annotation_pdf: {}  // Single pdf object. The current pdf being annotated.
};

function pdfsReducer (state = initialState, action) {
    switch (action.type) {
        case SET_ALL_PDFS: {
            const newState = {
                all_pdfs: [...action.data],
                datapoint_pdfs: [...state.datapoint_pdfs],
                annotation_pdf: {...state.annotation_pdf}
            };
            return newState;
        }
        case SET_DATAPOINTS_PDFS: {
            let pdf_indices = action.data
            let new_datapoint_pdfs = [...state.all_pdfs].filter(pdf => pdf_indices.includes(pdf.id))
            const newState = {
                all_pdfs: [...state.all_pdfs],
                datapoint_pdfs: new_datapoint_pdfs,
                annotation_pdf: {...state.annotation_pdf}
            };
            return newState;
        }
        case SET_ANNOTATION_PDF: {
            const newState = {
                all_pdfs: [...state.all_pdfs],
                datapoint_pdfs: [...state.datapoint_pdfs],
                annotation_pdf: {...action.data}
            };
            return newState;
        }
        default:
            return state;
    }
}

export default pdfsReducer;