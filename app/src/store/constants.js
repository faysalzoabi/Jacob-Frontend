export const SET_TOKEN = 'SET_TOKEN';
export const UNSET_TOKEN = 'UNSET_TOKEN';
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';
export const SET_TAGS = 'SET_TAGS';
export const SET_PDFS = 'SET_PDFS';
export const SET_PHRASES = 'SET_PHRASES';

let baseUrl;
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8875';
} else {
  baseUrl = 'https://jacob.propulsion-learn.ch';
}
export {
  baseUrl
};

let baseAPIUrl;
if (process.env.NODE_ENV === 'development') {
  baseAPIUrl = 'http://localhost:8875/backend/';
} else {
  baseAPIUrl = 'https://jacob.propulsion-learn.ch/backend/';
}
export {
  baseAPIUrl
};

