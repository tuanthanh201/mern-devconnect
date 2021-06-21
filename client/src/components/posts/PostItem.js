import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";

import { addLike, removeLike, deletePost } from "../../actions/post";
import { useState } from "react";

const PostItem = ({ post }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(
    post.likes.some((like) => like.user === auth.user._id)
  );

  const toggleLikeHandler = () => {
    if (isLiked) {
      dispatch(removeLike(post._id));
      setIsLiked(false);
    } else {
      dispatch(addLike(post._id));
      setIsLiked(true);
    }
  };

  const deletePostHandler = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className="round-img" src={post.avatar} alt="" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment>
        </p>
        <button
          type="button"
          className="btn btn-light"
          onClick={toggleLikeHandler}
        >
          <i className={`fas fa-thumbs-up ${isLiked ? "liked-post" : ""}`}></i>{" "}
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
        </button>
        <Link to={`/post/${post._id}`} className="btn btn-primary">
          Discussion{" "}
          {post.comments.length > 0 && (
            <span className="comment-count">{post.comments.length}</span>
          )}
        </Link>
        {auth.user._id === post.user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={deletePostHandler}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default PostItem;
