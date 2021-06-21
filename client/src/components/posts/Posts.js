import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import { getPosts, addPost } from "../../actions/post";

const Posts = ({ getPosts }) => {
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const dispatch = useDispatch();

  // Input refs
  const [text, setText] = useState("");

  // Initializing posts
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // PostItem; should have made a separate component but oh well
  let postsList;
  if (posts) {
    postsList = posts.map((post) => <PostItem key={post._id} post={post} />);
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = {
      text,
    };
    dispatch(addPost(formData));
    setText("");
  };

  return (
    <>
      {loading && <Spinner />}
      {!loading && posts !== null && (
        <>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to the community!
          </p>

          <div className="post-form">
            <div className="bg-primary p">
              <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={submitHandler}>
              <textarea
                spellCheck="false"
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post"
                value={text}
                required
                onChange={(event) => setText(event.target.value)}
              ></textarea>
              <input
                type="submit"
                className="btn btn-dark my-1"
                value="Submit"
              />
            </form>
          </div>

          <div className="posts">{postsList}</div>
        </>
      )}
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
};

export default connect(null, { getPosts })(Posts);
