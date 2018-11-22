export const SET_BLOGS = 'setBlogs';
export const SET_FOLLOWED_BLOGS = 'setFollowedBlogs';
export const SET_BLOG = 'setBlog';
export const SET_POSTS = 'setPosts';
export const SET_POST = 'setPost';
export const SET_DISEASES = 'setDiseases';
export const SET_USERFEEDS = 'setUserFeeds';
export const ADD_USERFEED = 'addUserFeed';
export const DELETE_USERFEED = 'deleteUserFeed';
export const UNSET_SELECTED_BLOG = 'UNSET_SELECTED_BLOG';
export const SET_TOKEN = 'SET_TOKEN';
export const UNSET_TOKEN = 'UNSET_TOKEN';
export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';
export const SET_SELECTED_BLOG = 'SET_SELECTED_BLOG';

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

