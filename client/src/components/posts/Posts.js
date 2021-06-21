import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";

import Spinner from "../layout/Spinner";
import { getPosts, addLike, removeLike } from "../../actions/post";

const Posts = ({
  getPosts,
  addLike,
  removeLike,
  post: { loading, posts },
  auth,
}) => {
  // Initializing posts
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // PostItem; should have made a separate component but oh well
  const postsList = posts.map((post) => (
    <div class="post bg-white p-1 my-1" key={post._id}>
      <div>
        <Link to={`/profile/${post.user}`}>
          <img class="round-img" src={post.avatar} alt="" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p class="my-1">{post.text}</p>
        <p class="post-date">
          Posted on <Moment format="DD/MM/YYYY">{post.date}</Moment>
        </p>
        <button
          type="button"
          class="btn btn-light"
          onClick={() => addLike(post._id)}
        >
          <i class="fas fa-thumbs-up"></i>{" "}
          {post.likes.length > 0 && <span>{post.likes.length}</span>}
        </button>
        <button
          type="button"
          class="btn btn-light"
          onClick={() => removeLike(post._id)}
        >
          <i class="fas fa-thumbs-down"></i>
        </button>
        <Link to={`/post/${post._id}`} class="btn btn-primary">
          Discussion{" "}
          {post.comments.length > 0 && (
            <span class="comment-count">{post.comments.length}</span>
          )}
        </Link>
        {auth.user._id === post.user && (
          <button type="button" class="btn btn-danger">
            <i class="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  ));

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 class="large text-primary">Posts</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome to the community!
      </p>

      <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form class="form my-1">
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>

      <div class="posts">{postsList}</div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, addLike, removeLike })(
  Posts
);
