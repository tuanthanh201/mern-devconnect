import axios from "axios";

import { setAlert } from "./alert";
import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_COMMENT,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  UPADTE_LIKES,
} from "./types";

// Get posts
export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/posts");

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Get post
export const getPost = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/${postId}`);

      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Add like
export const addLike = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);

      dispatch({
        type: UPADTE_LIKES,
        payload: { postId, likes: res.data },
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Remove like
export const removeLike = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);

      dispatch({
        type: UPADTE_LIKES,
        payload: { postId, likes: res.data },
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Add post
export const addPost = (formData) => {
  return async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/posts", formData, config);

      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      dispatch(setAlert("Post Created", "success"));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Delete post
export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/posts/${postId}`);

      dispatch({
        type: DELETE_POST,
        payload: postId,
      });

      dispatch(setAlert("Post Removed", "success"));
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Add comment
export const addComment = (postId, formData) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/posts/comment/${postId}`,
        formData,
        config
      );

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};

// Delete comment
export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      );

      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };
};
